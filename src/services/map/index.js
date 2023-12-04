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
      const radius = 0.3; // 300m를 킬로미터로 환산
      const earthRadius = 6371; // 지구 반지름 (킬로미터)

      const placeInfo = await Map.findAll({
        where: Sequelize.where(
            Sequelize.fn(
                'acos',
                Sequelize.literal(
                    `sin(RADIANS(${latitude})) * sin(RADIANS(latitude)) + cos(RADIANS(${latitude})) * cos(RADIANS(latitude)) * cos(RADIANS(${longitude} - longitude))`,
                ),
            ),
            {
              [Op.lte]: radius / earthRadius,
            },
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
