'use strict';

import {DataTypes, Model} from 'sequelize';
import Sequelize from "sequelize";

export default class FollowHistory extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        action: {
          type: DataTypes.ENUM("follow", "unfollow"),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "FollowHistory",
        tableName: "follow_history",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.FollowHistory.belongsTo(db.User, {
      foreignKey: "follower_id",
      as: "follower",
    });
    db.FollowHistory.belongsTo(db.User, {
      foreignKey: "following_id",
      as: "following",
    });
    db.FollowHistory.belongsTo(db.Follow, {
      foreignKey: "follow_id",
      as: "follow",
      constraints: false,
    });
  }
}
