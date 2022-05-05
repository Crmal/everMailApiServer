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
  // eslint-disable-next-line default-case
  switch (Object.keys(userTimeTables)[nullCount]) {
    case 'one_id':
      // eslint-disable-next-line no-await-in-loop
      await UserTimeTable.update({ one_id: id }, { where: { user_id: userData.id } });
      break;
    case 'two_id':
      // eslint-disable-next-line no-await-in-loop
      await UserTimeTable.update({ two_id: id }, { where: { user_id: userData.id } });
      break;
    case 'three_id':
      // eslint-disable-next-line no-await-in-loop
      await UserTimeTable.update({ three_id: id }, { where: { user_id: userData.id } });
      break;
    case 'four_id':
      // eslint-disable-next-line no-await-in-loop
      await UserTimeTable.update({ four_id: id }, { where: { user_id: userData.id } });
      break;
    case 'five_id':
      // eslint-disable-next-line no-await-in-loop
      await UserTimeTable.update({ five_id: id }, { where: { user_id: userData.id } });
      break;
    case 'six_id':
      // eslint-disable-next-line no-await-in-loop
      await UserTimeTable.update({ six_id: id }, { where: { user_id: userData.id } });
      break;
    case 'seven_id':
      // eslint-disable-next-line no-await-in-loop
      await UserTimeTable.update({ seven_id: id }, { where: { user_id: userData.id } });
      break;
    case 'eight_id':
      // eslint-disable-next-line no-await-in-loop
      await UserTimeTable.update({ eight_id: id }, { where: { user_id: userData.id } });
      break;
    case 'nine_id':
      // eslint-disable-next-line no-await-in-loop
      await UserTimeTable.update({ nine_id: id }, { where: { user_id: userData.id } });
      break;
    default:
      return res.json({
        error: {
          message: '시간표는 9개까지 추가가 가능합니다.',
        },
      });
  }
  return res.json({
    data: {
      message: '정상적으로 추가되었습니다.',
    },
  });
});

export default timeTable;
