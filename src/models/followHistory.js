'use strict';

import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../../loaders/sequelize.js';
import User from './user.js';

class FollowHistory extends Model {}

FollowHistory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      target_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.ENUM('follow', 'unfollow'),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'FollowHistory',
      tableName: 'follow_history',
    },
);

// 사용자와 팔로우 기록간의 관계 설정
// FollowHistory.belongsTo(User, {
//   foreignKey: 'user_id',
//   as: 'user',
// });

// FollowHistory.belongsTo(User, {
//   foreignKey: 'target_user_id',
//   as: 'targetUser',
// });

export default FollowHistory;
