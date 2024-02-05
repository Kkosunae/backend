'use strict';

import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../../loaders/sequelize.js';

class MapComplain extends Model {}

MapComplain.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      reason: {
        type: DataTypes.STRING(255), // 2200자까지 입력 가능
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('waiting', 'resolved', 'rejected'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'MapComplain', // 모델 이름
      tableName: 'map_complain', // 테이블 이름
    },
);

export default MapComplain;
