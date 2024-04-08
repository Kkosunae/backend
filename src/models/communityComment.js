'use strict';

import Sequelize from 'sequelize';
import {DataTypes, Model} from 'sequelize';

export default class CommunityComment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
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
          timestamps: true,
          modelName: 'CommunityComment',
          tableName: 'community_comment',
          charset: 'utf8',
          collate: 'utf8_general_ci',
        },
    );
  }

  static associate(db) {
    db.CommunityComment.belongsTo(db.Community, {
      foreignKey: 'community_id',
      as: 'community',
    });
    db.CommunityComment.belongsTo(db.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}
