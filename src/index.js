import { config } from 'dotenv';
import express, { json } from 'express';

const app = express();
const port = 3000;

config();
app.use(json());

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`${port}에서 대기중`);
});
