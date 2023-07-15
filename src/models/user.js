'use strict';

import config from 'config';
import Sequelize from 'sequelize';

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    unique: true,
                    primaryKey: true,
                },
                profile: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                    defaultValue: config.get('s3.basic_image')
                },
                user_name: {
                    type: Sequelize.STRING(30),
                    unique: true,
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING(30),
                    unique: true,
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                createdAt: 'created_at',
                updatedAt: 'updated_at',
                modelName: 'User',
                tableName: 'user_info',
                charset: 'utf8',
                collate: 'utf8_general_ci',
            },
        );
    }

    static associate(db) {
    }
};

export default User;