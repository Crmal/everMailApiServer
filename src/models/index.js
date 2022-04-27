import { Sequelize } from 'sequelize';

import config from '../../config';

import EmailTable from './emailTable';
import FullTimeTable from './fullTimeTable';
import User from './user';
import UserTimeTable from './userTimeTable';

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development,
);

const db = {
  sequelize,
  User,
  EmailTable,
  FullTimeTable,
  UserTimeTable,
};

User.init(sequelize);
EmailTable.init(sequelize);
FullTimeTable.init(sequelize);
UserTimeTable.init(sequelize);

User.associate(db);
EmailTable.associate(db);
UserTimeTable.associate(db);

export default db;
