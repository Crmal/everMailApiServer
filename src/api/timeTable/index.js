import { parse } from 'url';

import { Router } from 'express';
import { verify } from 'jsonwebtoken';
import { Op } from 'sequelize';

import { loginChecker } from '../../middleware/checker';
import FullTimeTable from '../../models/fullTimeTable';
import UserTimeTable from '../../models/userTimeTable';

const timeTable = Router();
const attributes = [
  'one_id',
  'two_id',
  'three_id',
  'four_id',
  'five_id',
  'six_id',
  'seven_id',
  'eight_id',
  'nine_id',
];
timeTable.get('/', loginChecker, async (req, res) => {
  const token = req.header('x-access-token');
  const userData = verify(token, process.env.JWT_SECRET);
  const userTimeTables = await UserTimeTable.findOne({
    attributes,
    where: { user_id: userData.id },
    raw: true,
  });

  // eslint-disable-next-line
  const tableArray = new Array();
  for (let i = 0; i < attributes.length; i += 1) {
    if (userTimeTables[attributes[i]] != null) {
      tableArray.push(
        // eslint-disable-next-line no-await-in-loop
        await FullTimeTable.findOne({ where: { id: userTimeTables[attributes[i]] }, raw: true }),
      );
    }
  }
  res.json({
    data: {
      timeTable: tableArray,
    },
  });
});

timeTable.post('/', loginChecker, async (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const { id } = req.body;
  const token = req.header('x-access-token');
  const userData = verify(token, process.env.JWT_SECRET);
  if (FullTimeTable.findOne({ where: { id } })) {
    return res.status(401).json({
      error: {
        message: '없는 시간표 입니다.',
      },
    });
  }
  const userTimeTables = await UserTimeTable.findOne({
    attributes,
    where: {
      user_id: userData.id,
    },
    raw: true,
  });
  const nullCount = Object.values(userTimeTables).indexOf(null);
  if (Object.values(userTimeTables).indexOf(id) !== -1) {
    return res.status(403).json({
      error: {
        message: '이미 신청한 시간표입니다.',
      },
    });
  }
  if (nullCount === -1) {
    return res.status(403).json({
      error: {
        message: '시간표는 9개까지만 추가가 가능합니다.',
      },
    });
  }
  await UserTimeTable.update(
    {
      [attributes[nullCount]]: id,
    },
    { where: { user_id: userData.id } },
  );

  return res.json({
    data: {
      message: '정상적으로 추가되었습니다.',
    },
  });
});

timeTable.delete('/', loginChecker, async (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const { id } = req.body;
  const token = req.header('x-access-token');
  const userData = verify(token, process.env.JWT_SECRET);
  const userTimeTables = await UserTimeTable.findOne({
    attributes,
    where: {
      user_id: userData.id,
    },
    raw: true,
  });
  const nullCount = Object.values(userTimeTables).indexOf(id);

  await UserTimeTable.update(
    {
      [attributes[nullCount]]: null,
    },
    { where: { user_id: userData.id } },
  );

  return res.json({
    data: {
      message: '정상적으로 삭제되었습니다.',
    },
  });
});

timeTable.get('/entire', loginChecker, async (req, res) => {
  const { query } = parse(req.url, true);
  let timeTables;
  if (query.subject_name) {
    timeTables = await FullTimeTable.findAll({
      where: {
        subject_name: {
          [Op.like]: `%${query.subject_name}%`,
        },
      },
    });
  } else {
    timeTables = await FullTimeTable.findAll({});
  }
  return res.json({
    data: {
      timeTables,
    },
  });
});

timeTable.post('/admin', loginChecker, async (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const { subject_name, time, professor_name, professor_email, lecture_room } = req.body;
  await FullTimeTable.create({
    subject_name,
    time,
    professor_name,
    professor_email,
    lecture_room,
  });
  return res.json('정상');
});

export default timeTable;
