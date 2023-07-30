'use strict';

import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../../loaders/sequelize.js';

class Follow extends Model {}

Follow.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      follower_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      following_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Follow',
      tableName: 'follow',
    },
);

export default Follow;
