import express from 'express';

import sequelize from './utils/database';
import router from './routes/routes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(router);

sequelize.sync();

app.listen(5000);
