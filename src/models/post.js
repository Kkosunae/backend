'use strict';

import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../../loaders/sequelize.js';

class Post extends Model {}

Post.init(
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
        type: DataTypes.STRING(2200), // 2200자까지 입력 가능
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Post', // 모델 이름
      tableName: 'post', // 테이블 이름
    },
);

export default Post;