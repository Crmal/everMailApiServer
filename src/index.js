import cors from 'cors';
import { config } from 'dotenv';
import express, { json } from 'express';

import apiRouter from './api';
import sequelize from './models';

const app = express();
const port = 3000;

config();
app.use(json());

app.use(cors());
app.get('/', async (req, res) => {
  res.json('everymail');
});
app.use('/api', apiRouter);
// 디비 연결
sequelize.sequelize // 시퀄라이즈 연결
  .sync({ force: false }) // force는 서버 실행시마다 테이블 재생성 여부
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('데이터베이스 연결 성공');
  })
  .catch(err => {
    console.error(err);
  });

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`http://localhost:${port}에서 대기중`);
});
