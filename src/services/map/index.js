import {models} from '../../models/index.js';
import Sequelize from 'sequelize';
const {Op} = Sequelize;

const {Map} = models;

const attributes = {
  exclude: ['createdAt', 'updatedAt'], // createdAt 및 updatedAt 칼럼 제외 설정
};

export const mapService = {
  getPlaceInfo: async (latitude, longitude) => {
    try {
      const radius = 300; // 300m

      const placeInfo = await Map.findAll({
        where: Sequelize.literal(
            `ST_DWithin(
            geom, 
            ST_MakePoint(${longitude}, ${latitude})::geography, 
            ${radius}
          )`,
        ),
        attributes, // timestamps: false 설정 추가
        group: ['place_type'], // place_type 칼럼으로 그룹화
      });

      return placeInfo;
    } catch (error) {
      throw error;
    }
  },
};

export default mapService;
