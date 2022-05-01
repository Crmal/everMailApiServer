import bcrypt from 'bcrypt';
import { Router } from 'express';
import { sign } from 'jsonwebtoken';

import User from '../../models/user';

const auth = Router();

auth.post('/sign-up', async (req, res) => {
  // eslint-disable-next-line
  const { name, id_name, password, email, phone } = req.body;
  const hash = await bcrypt.hash(password, 10);
  // eslint-disable-next-line camelcase
  const userData = await User.findOne({ where: { id_name } });
  if (userData) {
    return res.status(409).json({
      error: {
        message: '이미 가입된 이메일입니다. 로그인을 진행해주세요.',
      },
    });
  }
  await User.create({
    name,
    // eslint-disable-next-line camelcase
    id_name,
    password: hash,
    email,
    phone,
  });
  return res.status(200).json({
    data: {
      message: '회원가입이 완료되었습니다.',
    },
  });
});

auth.post('/sign-in', async (req, res) => {
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
