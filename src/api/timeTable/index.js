import { Router } from 'express';
import { verify } from 'jsonwebtoken';

import { loginValidator } from '../../middleware/validator';
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
timeTable.get('/', loginValidator, async (req, res) => {
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

timeTable.post('/', async (req, res) => {
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
  const nullCount = Object.values(userTimeTables).indexOf(null);
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

timeTable.delete('/', async (req, res) => {
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

export default timeTable;
