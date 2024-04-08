'use strict';

import Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";

export default class Footprint extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
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
        timestamps: true,
        modelName: "Footprint",
        tableName: "footprint",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associations(db) {
    db.Footprint.belongsTo(db.User, {
      foreignKey: "user_id",
      as: "user",
    });
    db.Footprint.hasMany(db.FootprintImage, {
      foreignKey: "footprint_id",
      as: "footprintImage",
    });
    db.Footprint.hasMany(db.FootprintComment, {
      foreignKey: "footprint_id",
      as: "footprintComment",
    });
  }
}
