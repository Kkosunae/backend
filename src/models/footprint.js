'use strict';

import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../../loaders/sequelize.js';

class Footprint extends Model {}

Footprint.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      latitude: {
        type: DataTypes.FLOAT, // 소숫점 6자리까지
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT, // 소숫점 6자리까지
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(500), // 2200자까지 입력 가능
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // 기본값으로 삭제되지 않은 상태로 설정
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Footprint', // 모델 이름
      tableName: 'footprint', // 테이블 이름
    },
);

export default Footprint;
