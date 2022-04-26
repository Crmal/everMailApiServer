import { Sequelize } from 'sequelize';

import config from '../../config';

import User from './user';

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development,
);

const db = {
  sequelize,
  User,
};

User.init();

User.associate(db);

export default db;
