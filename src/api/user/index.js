import { Router } from 'express';
import { verify } from 'jsonwebtoken';

import { loginChecker } from '../../middleware/checker';
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

export default user;
