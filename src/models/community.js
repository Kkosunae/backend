'use strict';

import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../../loaders/sequelize.js';

class Community extends Model {}

Community.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING(1000), // 10000자까지 입력 가능
        allowNull: false,
      },
      // 좋아요 하는 사람들의 id를 저장하는 list 칼럼
      likes: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // 기본값으로 삭제되지 않은 상태로 설정
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Community', // 모델 이름
      tableName: 'community', // 테이블 이름
    },
);

export default Community;
