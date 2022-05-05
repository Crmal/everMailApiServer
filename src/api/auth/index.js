import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { Router } from 'express';
import { sign } from 'jsonwebtoken';

import { loginValidator, signValidator } from '../../middleware/validator';
import User from '../../models/user';
import UserTimeTable from '../../models/userTimeTable';

const auth = Router();
config();

auth.post('/sign-up', signValidator, async (req, res) => {
  // eslint-disable-next-line
  const { name, nickName, password, email, phone } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const userData = await User.findOne({ where: { nickName } });
  const emailData = await User.findOne({ where: { email } });
  if (userData || emailData) {
    return res.status(409).json({
      error: {
        message: '이미 가입된 이메일입니다. 로그인을 진행해주세요.',
      },
    });
  }
  const createUser = await User.create({
    name,
    // eslint-disable-next-line camelcase
    nickName,
    password: hash,
    email,
    phone,
  });
  await UserTimeTable.create({
    user_id: createUser.id,
  });
  return res.status(200).json({
    data: {
      message: '회원가입이 완료되었습니다.',
    },
  });
});

auth.post('/sign-in', loginValidator, async (req, res) => {
  // eslint-disable-next-line
  const { nickName, password } = req.body;
  const user = await User.findOne({ where: { nickName } });
  const jwt = sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1days',
      issuer: 'everyMail',
    },
  );
  return res.json({
    data: {
      jwt,
    },
  });
});

export default auth;
