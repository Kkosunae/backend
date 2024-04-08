'use strict';

import Sequelize from 'sequelize';
import {DataTypes, Model} from 'sequelize';

export default class MapComplain extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
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
          timestamps: true,
          modelName: 'MapComplain',
          tableName: 'map_complain',
          charset: 'utf8',
          collate: 'utf8_general_ci',
        },
    );
  }

  static associate(db) {
    db.MapComplain.belongsTo(db.Map, {
      foreignKey: 'map_id',
      as: 'map',
    });
  }
}
