'use strict';

import Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";

export default class FootprintImage extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        url: {
          type: DataTypes.STRING, // 이미지 URL을 저장하는 필드
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
        modelName: "FootprintImage",
        tableName: "footprint_image",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associations(db) {
    db.FootprintImage.belongsTo(db.Footprint, {
      foreignKey: "footprint_id",
      as: "footprint",
    });
  }
}