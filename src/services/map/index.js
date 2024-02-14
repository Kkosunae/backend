import {models} from '../../models/index.js';
import Sequelize from 'sequelize';
const {Op} = Sequelize;

const {Map, Footprint, FootprintImage, User} = models;

const attributes = {
  exclude: ['createdAt', 'updatedAt'], // createdAt 및 updatedAt 칼럼 제외 설정
};

export const mapService = {
  getPlaces: async (radius, latitude, longitude) => {
    try {
      const placeInfo = await Map.findAll({
        where: Sequelize.literal(
            `ST_DWithin(
            ST_MakePoint(longitude, latitude)::geography,
            ST_MakePoint(${longitude}, ${latitude})::geography,
            ${radius}
          )`,
        ),
        attributes, // timestamps: false 설정 추가
      });

      return placeInfo;
    } catch (error) {
      throw error;
    }
  },
  getFootprintsWithoutMine: async (userId, radius, latitude, longitude) => {
    try {
      const footprints = await Footprint.findAll({
        where: {
          user_id: {[Sequelize.Op.ne]: userId}, // userId에 해당하지 않는 Footprint만 선택
          [Sequelize.Op.and]: Sequelize.literal(
              `ST_DWithin(
              ST_MakePoint(longitude, latitude)::geography,
              ST_MakePoint(${longitude}, ${latitude})::geography,
              ${radius}
            )`,
          ),
        },
        attributes,
        include: [
          {
            model: FootprintImage,
            as: 'footprintImage',
            attributes: ['url'],
            where: {isDeleted: false},
            required: false,
          },
          {
            model: User,
            as: 'user',
            attributes: ['name'],
            required: false,
          },
        ],
      });

      return footprints;
    } catch (error) {
      throw error;
    }
  },
  getMyFootprints: async (userId, radius, latitude, longitude) => {
    try {
      const footprints = await Footprint.findAll({
        where: {
          user_id: userId, // userId에 해당하는 Footprint만 선택
          [Sequelize.Op.and]: Sequelize.literal(
              `ST_DWithin(
              ST_MakePoint(longitude, latitude)::geography,
              ST_MakePoint(${longitude}, ${latitude})::geography,
              ${radius}
            )`,
          ),
        },
        attributes,
        include: [
          {
            model: FootprintImage,
            as: 'footprintImage',
            attributes: ['url'],
            where: {isDeleted: false},
            required: false,
          },
        ],
      });

      return footprints;
    } catch (error) {
      throw error;
    }
  },
};

export default mapService;
