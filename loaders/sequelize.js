'use strict';

import Sequelize from 'sequelize';
import config from 'config';
import models from '../src/models/index.js';

const sequelize = new Sequelize(
    config.get('mysql.database'),
    config.get('mysql.username'),
    config.get('mysql.password'),
    {
        host: config.get('mysql.host'),
        dialect: config.get('mysql.dialect'),
        timezone: config.get('mysql.timezone'), // 예시: 대한민국 시간대에 맞는 옵션 설정
    },
);

// Object.values(models).forEach((model) => model.init(sequelize));
// Object.values(models)
//     .filter((model) => typeof model.associate === 'function')
//     .forEach((model) => model.associate(models));

export { sequelize, models };