'use strict';

import {DataTypes, Model} from 'sequelize';
import Sequelize from "sequelize";

export default class Follow extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Follow",
        tableName: "follow",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associations(db) {
    db.Follow.belongsTo(db.User, {
      foreignKey: "follower_id",
      as: "follower",
    });
    db.Follow.belongsTo(db.User, {
      foreignKey: "following_id",
      as: "following",
    });
    db.Follow.hasMany(db.FollowHistory, {
      foreignKey: "follow_id",
      as: "follow",
    });
  }
}
