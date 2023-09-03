'use strict';

import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../../loaders/sequelize.js';

class PostImage extends Model {}

PostImage.init(
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
    },
    {
      sequelize,
      modelName: 'PostImage',
      tableName: 'post_image',
    },
);

export default PostImage;
