import { Router } from 'express';
import { verify } from 'jsonwebtoken';

import { loginChecker } from '../../middleware/checker';
import EmailTable from '../../models/emailTable';
import User from '../../models/user';

const user = Router();

user.get('/', loginChecker, async (req, res) => {
  const token = req.header('x-access-token');
  const userToken = verify(token, process.env.JWT_SECRET);
  const userData = await User.findOne({
    attributes: ['name'],
    where: { id: userToken.id },
    raw: true,
  });
  res.json({
    data: {
      userData,
    },
  });
});

user.get('/mail', loginChecker, async (req, res) => {
  const header = req.header('X-Access-Token');
  const userData = verify(header, process.env.JWT_SECRET);
  const mailData = await EmailTable.findAll({ where: { send_id: userData.id } });
  console.log(mailData);
  res.json({
    data: {
      mailData,
    },
  });
});

export default user;
