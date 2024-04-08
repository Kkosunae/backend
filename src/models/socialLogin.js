'use strict';

import Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";

export default class SocialLogin extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        social_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        type: {
          type: DataTypes.ENUM("KAKAO", "GOOGLE", "APPLE"),
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "SocialLogin",
        tableName: "social_login",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associations(db) {
    db.SocialLogin.belongsTo(db.User, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}
