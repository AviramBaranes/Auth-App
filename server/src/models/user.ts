import { INTEGER, STRING } from 'sequelize';

import sequelize from '../utils/database';

const User = sequelize.define(
  'users',
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    email: {
      type: STRING,
      allowNull: false,
    },

    name: {
      type: STRING,
    },

    password: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default User;
