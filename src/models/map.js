'use strict';

import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../../loaders/sequelize.js';

class Map extends Model {}

Map.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255), // 2200자까지 입력 가능
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(255), // 2200자까지 입력 가능
        allowNull: true,
      },
      latitude: {
        type: DataTypes.FLOAT, // 소숫점 6자리까지
        allowNull: true,
      },
      longitude: {
        type: DataTypes.FLOAT, // 소숫점 6자리까지
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(10), // 2200자까지 입력 가능
        allowNull: true,
      },
      gu: {
        type: DataTypes.STRING(10), // 2200자까지 입력 가능
        allowNull: true,
      },
      place_type: {
        type: DataTypes.STRING(10), // 2200자까지 입력 가능
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Map', // 모델 이름
      tableName: 'map', // 테이블 이름
    },
);

export default Map;
