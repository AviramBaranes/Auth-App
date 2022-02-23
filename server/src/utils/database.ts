import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('loginDB', 'root', 'mysqlJJ003nz', {
  dialect: 'mysql',
  host: 'localhost',
});

export default sequelize;
