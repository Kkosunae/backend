import {models} from '../../models/index.js';
import Sequelize from 'sequelize';
const {Op} = Sequelize;

const {Footprint, FootprintImage} = models;

export const footprintService = {
  createFootprint: async (userId, content, latitude, longitude, imageUrls) => {
    try {
      // 게시물 생성
      const newFootprint = await Footprint.create({
        content,
        latitude,
        longitude,
        user_id: userId,
        isDeleted: false,
      });

      // 이미지 URL 저장
      if (imageUrls && imageUrls.length > 0) {
        const imageRecords = imageUrls.map((url) => ({
          url,
          footprint_id: newFootprint.id, // 게시물과 이미지 연결
        }));

        await FootprintImage.bulkCreate(imageRecords);
      }

      return newFootprint;
    } catch (error) {
      throw error;
    }
  },
  getFootprint: async (latitude, longitude) => {
    try {
      const radius = 0.3; // 300m를 킬로미터로 환산
      const earthRadius = 6371; // 지구 반지름 (킬로미터)

      const footprints = await Footprint.findAll({
        include: [
          {
            model: FootprintImage,
            attributes: ['url'],
            as: 'footprintImage',
          },
        ],
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
      });
      return footprints;
    } catch (error) {
      throw error;
    }
  },
};

export default footprintService;
