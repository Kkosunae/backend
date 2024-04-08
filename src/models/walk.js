'use strict';

import Sequelize from 'sequelize';
import {DataTypes, Model} from 'sequelize';

export default class Walk extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
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
          timestamps: true,
          modelName: 'Walk',
          tableName: 'walk',
          charset: 'utf8',
          collate: 'utf8_general_ci',
        },
    );
  }

  static associate(db) {
    db.Walk.belongsTo(db.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}
