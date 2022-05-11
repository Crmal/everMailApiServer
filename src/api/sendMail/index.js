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
  await EmailTable.create({
    sender_name: userId.email,
    receive_name: professor_email,
    subject,
    text,
    send_id: userId.id,
  });
  res.json({
    data: {
      message: '정상적으로 전송 되었습니다.',
    },
  });
});

export default sendMail;
