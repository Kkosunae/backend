import {models} from '../models/index.js';
import {Op} from 'sequelize';
import sequelize from 'sequelize';

const {Walk} = models;

const calculateDuration = (startTime, endTime) => {
  if (!startTime || !endTime) {
    return null;
  }

  const durationInMilliseconds = endTime - startTime;
  const durationInSeconds = Math.floor(durationInMilliseconds / 1000);

  return durationInSeconds;
};

const getCommonStatistics = async (whereCondition) => {
  try {
    const statistics = await Walk.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'walkCount'],
        [
          sequelize.fn('AVG', sequelize.fn('EXTRACT', sequelize.literal('EPOCH FROM ("Walk"."endTime" - "Walk"."startTime")'))),
          'averageDuration',
        ],
        [
          sequelize.fn('SUM', sequelize.fn('EXTRACT', sequelize.literal('EPOCH FROM ("Walk"."endTime" - "Walk"."startTime")'))),
          'totalDuration',
        ],
        [
          sequelize.fn('MAX', sequelize.fn('EXTRACT', sequelize.literal('EPOCH FROM ("Walk"."endTime" - "Walk"."startTime")'))),
          'maxDuration',
        ],
        [
          sequelize.fn('AVG', sequelize.col('distance')),
          'averageDistance',
        ],
        [
          sequelize.fn('SUM', sequelize.col('distance')),
          'totalDistance',
        ],
        [
          sequelize.fn('MAX', sequelize.col('distance')),
          'maxDistance',
        ],
      ],
      where: {
        endTime: {
          [sequelize.Op.not]: null,
        },
        isWalking: false,
        ...whereCondition, // whereCondition 추가
      },
      raw: true,
    });

    return statistics[0]; // 반환 결과가 배열이므로 첫 번째 요소를 선택
  } catch (error) {
    console.error(error);
    throw new Error('Error getting statistics');
  }
};

export const walkService = {
  isUserWalking: async (userId) => {
    try {
      const walk = await Walk.findOne(
          {where: {user_id: userId, isWalking: true}},
      );
      return walk;
    } catch (error) {
      return false;
    }
  },
  isValidWalk: async (userId, walkId) => {
    try {
      const walk = await Walk.findOne(
          {where: {id: walkId, user_id: userId, isWalking: true}},
      );
      return walk;
    } catch (error) {
      return false;
    }
  },
  startWalk: async (userId, latitude, longitude) => {
    try {
      const walk = await Walk.create({
        startTime: new Date(),
        isWalking: true,
        user_id: userId,
        startLatitude: latitude,
        startLongitude: longitude,
      });
      return walk;
    } catch (error) {
      console.error(error);
      throw new Error('Error starting walk');
    }
  },
  endWalk: async (userId, walkId, latitude, longitude, distance) => {
    try {
      const walk = await Walk.findOne(
          {where: {id: walkId, user_id: userId, isWalking: true}},
      );

      if (!walk) {
        throw new Error('산책 정보를 찾을 수 없습니다.');
      }

      walk.endTime = new Date();
      walk.isWalking = false;
      walk.endLatitude = latitude;
      walk.endLongitude = longitude;
      walk.distance = distance;
      await walk.save();

      walk.duration = calculateDuration(walk.startTime, walk.endTime);
      return walk;
    } catch (error) {
      console.error(error);
      throw new Error('Error ending walk');
    }
  },
  getTotalStatistics: async () => {
    const statistics = await getCommonStatistics({});
    return statistics;
  },
  getMonthlyStatistics: async () => {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    const statistics = await getCommonStatistics({
      startTime: {
        [Op.gte]: startDate,
      },
    });
    return statistics;
  },
  getWeeklyStatistics: async () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    const statistics = await getCommonStatistics({
      startTime: {
        [Op.gte]: startDate,
      },
    });
    return statistics;
  },
  getRecentWalk: async () => {
    try {
      const recentWalk = await Walk.findOne({
        where: {
          endTime: {
            [Op.not]: null,
          },
          isWalking: false,
        },
        order: [['startTime', 'DESC']],
        limit: 1,
      });
      recentWalk.dataValues.duration = calculateDuration(recentWalk.startTime, recentWalk.endTime);

      return recentWalk;
    } catch (error) {
      console.error(error);
      throw new Error('Error getting recent walk');
    }
  },
};

export default walkService;
