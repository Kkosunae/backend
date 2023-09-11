import app from './loaders/express.js';
import router from './src/routes/index.js';
import {config, yaml, swaggerUI, sequelize} from './loaders/module.js';
import authMiddleware from './middlewares/authMiddleware.js';
import express from 'express';

const openAPIDocument = yaml.load('./api/openapi.yaml');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(authMiddleware);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openAPIDocument));
app.use('/', router);

app.listen(config.get('server.port'));

// 모델과 데이터베이스 동기화
(async () => {
  try {
    // 데이터베이스와 연결
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // 모델과 데이터베이스 동기화 (모델의 테이블을 생성)
    await sequelize.sync();

    console.log('Models have been synchronized to the database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
