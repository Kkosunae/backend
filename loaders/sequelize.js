'use strict';

import Sequelize from 'sequelize';
import config from 'config';
import {models} from '../src/models/index.js';

const sequelize = new Sequelize(
    config.get('postgres.database'),
    config.get('postgres.username'),
    config.get('postgres.password'),
    {
      host: config.get('postgres.host'),
      dialect: config.get('postgres.dialect'),
      timezone: config.get('postgres.timezone'), // 예시: 대한민국 시간대에 맞는 옵션 설정
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    },
);

export {sequelize, models};
