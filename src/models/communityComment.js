'use strict';

import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../../loaders/sequelize.js';

class CommunityComment extends Model {}

CommunityComment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING(200), // 200자까지 입력 가능
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // 기본값으로 삭제되지 않은 상태로 설정
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CommunityComment', // 모델 이름
      tableName: 'community_comment', // 테이블 이름
    },
);

export default CommunityComment;
