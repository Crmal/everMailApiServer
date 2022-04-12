import { Sequelize } from 'sequelize';

import config from '../../config';

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development,
);

const db = {
  sequelize,
};

export default db;
