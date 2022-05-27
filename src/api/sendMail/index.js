import { Router } from 'express';
import { verify } from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { loginChecker } from '../../middleware/checker';
import { sendMailValidator } from '../../middleware/validator';
import EmailTable from '../../models/emailTable';
import User from '../../models/user';

const sendMail = Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

sendMail.post('/', loginChecker, sendMailValidator, async (req, res) => {
  const header = req.header('X-Access-Token');
  const userData = verify(header, process.env.JWT_SECRET);
  const userId = await User.findOne({
    attributes: ['id', 'email'],
    where: { id: userData.id },
    raw: true,
  });

  // eslint-disable-next-line prefer-destructuring
  const { professor_email, text, subject } = req.body;
  await transporter.sendMail({
    from: '박재민',
    to: professor_email,
    subject,
    html: text,
  });
  const name = ['김성철', '배종우', '신서용', '강환일', '정재희'];
  const subject_nameing = ['파이썬', '파이썬', '회로이론', '회로이론', '인터넷 프로그래밍'];
  const sPick = Math.floor(Math.random() * name.length);
  await EmailTable.create({
    sender_name: userId.email,
    receive_name: professor_email,
    subject,
    text,
    send_id: userId.id,
    subject_name: subject_nameing[sPick],
    receive: name[sPick],
  });
  res.json({
    data: {
      message: '정상적으로 전송 되었습니다.',
    },
  });
});

export default sendMail;
