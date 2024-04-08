'use strict';

import Sequelize from "sequelize";

export default class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        birthday: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        gender: {
          type: DataTypes.ENUM("male", "female", "other"),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "User",
        tableName: "user",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associations(db) {
    db.User.hasOne(db.SocialLogin, {
      foreignKey: "user_id",
      as: "socialLogin",
    });
    db.User.hasMany(db.Follow, {
      foreignKey: "follower_id",
      as: "followerUser",
    });
    db.User.hasMany(db.Follow, {
      foreignKey: "following_id",
      as: "followingUser",
    });
    db.User.hasMany(db.FollowHistory, {
      foreignKey: "follower_id",
      as: "follower",
    });
    db.User.hasMany(db.FollowHistory, {
      foreignKey: "following_id",
      as: "following",
    });
    db.User.hasMany(db.Footprint, { foreignKey: "user_id", as: "footprint" });
    db.User.hasMany(db.FootprintComment, {
      foreignKey: "user_id",
      as: "footprintComment",
    });
    db.User.hasMany(db.Walk, { foreignKey: "user_id", as: "walk" });
    db.User.hasMany(db.Community, { foreignKey: "user_id", as: "community" });
    db.User.hasMany(db.CommunityComment, {
      foreignKey: "user_id",
      as: "communityComment",
    });
  }
}
