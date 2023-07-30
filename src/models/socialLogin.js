'use strict';

import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../../loaders/sequelize.js';
import User from './user.js';

class SocialLogin extends Model {}

SocialLogin.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      auth_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      auth_type: {
        type: DataTypes.STRING,
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
      birthday: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'SocialLogin',
      tableName: 'social_login',
    },
);


// // 사용자와 팔로우 기록간의 관계 설정
// SocialLogin.belongsTo(User, {
//   foreignKey: 'user_id',
//   as: 'user',
// });

export default SocialLogin;
