'use strict';

import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../../loaders/sequelize.js';
import User from './user.js';
import {models} from './index.js';

class FollowHistory extends Model {}

FollowHistory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      action: {
        type: DataTypes.ENUM('follow', 'unfollow'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'FollowHistory',
      tableName: 'follow_history',
    },
);

export default FollowHistory;
