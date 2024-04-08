'use strict';

import Sequelize from 'sequelize';
import {DataTypes, Model} from 'sequelize';

export default class Community extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
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
          timestamps: true,
          modelName: 'Community',
          tableName: 'community',
          charset: 'utf8',
          collate: 'utf8_general_ci',
        },
    );
  }

  static associate(db) {
    db.Community.belongsTo(db.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    db.Community.hasMany(db.CommunityImage, {
      foreignKey: 'community_id',
      as: 'communityImage',
    });
    db.Community.hasMany(db.CommunityComment, {
      foreignKey: 'community_id',
      as: 'communityComment',
    });
  }
}
