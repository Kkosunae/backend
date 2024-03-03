'use strict';

import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../../loaders/sequelize.js';

class Walk extends Model {}

Walk.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isWalking: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      startLatitude: {
        type: DataTypes.FLOAT, // 소숫점 6자리까지
        allowNull: true,
      },
      startLongitude: {
        type: DataTypes.FLOAT, // 소숫점 6자리까지
        allowNull: true,
      },
      endLatitude: {
        type: DataTypes.FLOAT, // 소숫점 6자리까지
        allowNull: true,
      },
      endLongitude: {
        type: DataTypes.FLOAT, // 소숫점 6자리까지
        allowNull: true,
      },
      distance: {
        type: DataTypes.FLOAT, // 미터 기준
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Walk',
      tableName: 'walk', // 테이블 이름 설정
    },
);

export default Walk;
