'use strict';

import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../../loaders/sequelize.js';


import Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";

export default class Map extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(255), // 2200자까지 입력 가능
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING(255), // 2200자까지 입력 가능
          allowNull: true,
        },
        latitude: {
          type: DataTypes.FLOAT, // 소숫점 6자리까지
          allowNull: true,
        },
        longitude: {
          type: DataTypes.FLOAT, // 소숫점 6자리까지
          allowNull: true,
        },
        city: {
          type: DataTypes.STRING(10), // 2200자까지 입력 가능
          allowNull: true,
        },
        gu: {
          type: DataTypes.STRING(10), // 2200자까지 입력 가능
          allowNull: true,
        },
        place_type: {
          type: DataTypes.STRING(10), // 2200자까지 입력 가능
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Map",
        tableName: "map",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associations(db) {
    db.Map.hasMany(db.MapComplain, {
      foreignKey: "map_id",
      as: "mapComplain",
    });
  }
}
