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
  endWalk: async (userId, walkId, latitude, longitude) => {
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
      await walk.save();

      walk.duration = calculateDuration(walk.startTime, walk.endTime);
      return walk;
    } catch (error) {
      console.error(error);
      throw new Error('Error ending walk');
    }
  },
  getTotalStatistics: async () => {
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
        ],
        where: {
          endTime: {
            [sequelize.Op.not]: null,
          },
          isWalking: false,
        },
        raw: true,
      });

      return statistics[0]; // 반환 결과가 배열이므로 첫 번째 요소를 선택
    } catch (error) {
      console.error(error);
      throw new Error('Error getting total statistics');
    }
  },
  // getTotalStatistics 형식으로 조회하는 최근 한달 통계
  getMonthlyStatistics: async () => {
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
        ],
        where: {
          endTime: {
            [sequelize.Op.not]: null,
          },
          isWalking: false,
          startTime: {
            [Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 1)),
          },
        },
        raw: true,
      });

      return statistics[0]; // 반환 결과가 배열이므로 첫 번째 요소를 선택
    } catch (error) {
      console.error(error);
      throw new Error('Error getting monthly statistics');
    }
  },
  getWeeklyStatistics: async () => {
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
        ],
        where: {
          endTime: {
            [sequelize.Op.not]: null,
          },
          isWalking: false,
          startTime: {
            [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 7)),
          },
        },
        raw: true,
      });

      return statistics[0]; // 반환 결과가 배열이므로 첫 번째 요소를 선택
    } catch (error) {
      console.error(error);
      throw new Error('Error getting weekly statistics');
    }
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
