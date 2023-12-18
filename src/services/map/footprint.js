import {models} from '../../models/index.js';
import Sequelize from 'sequelize';
const {Op} = Sequelize;

const {User, Footprint, FootprintComment, FootprintImage} = models;

export const footprintService = {
  // 게시글을 작성한 유저의 id 가져오기
  getUserId: async (footprintId) => {
    try {
      const post = await Footprint.findOne({
        where: {
          id: footprintId,
        },
      });
      return post.user_id;
    } catch (error) {
      throw error;
    }
  },
  // 댓글을 작성한 유저의 id 가져오기
  getCommentUserId: async (commentId) => {
    try {
      const comment = await FootprintComment.findOne({
        where: {
          id: commentId,
        },
      });
      console.log(comment);
      return comment.user_id;
    } catch (error) {
      throw error;
    }
  },
  isValidFootprint: async (footprintId) => {
    try {
      const footprint = await Footprint.findOne({
        where: {
          id: footprintId,
          isDeleted: false,
        },
      });
      return footprint;
    } catch (error) {
      throw error;
    }
  },
  isValidComment: async (commentId) => {
    try {
      const comment = await FootprintComment.findOne({
        where: {
          id: commentId,
          isDeleted: false,
        },
      });
      return comment;
    } catch (error) {
      throw error;
    }
  },
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
  createPost: async ({userId, content, imageUrls}) => {
    try {
      // 게시물 생성
      const newFootprint = await Footprint.create({
        content,
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
  getPost: async (page = 1, limit = 5) => {
    try {
      page = parseInt(page);
      limit = parseInt(limit);

      if (isNaN(page)) {
        page = 1;
      }
      if (isNaN(limit)) {
        limit = 5;
      }

      const offset = (page - 1) * limit;
      const posts = await Footprint.findAll({
        include: [
          {
            model: FootprintImage,
            attributes: ['url'],
            as: 'footprintImage',
          },
          {
            model: User,
            attributes: ['name'],
            as: 'user',
          },
        ],
        where: {
          isDeleted: false,
        },
        order: [['createdAt', 'DESC']],
        offset: offset,
        limit: limit,
      });
      return posts;
    } catch (error) {
      throw error;
    }
  },
  getFootprintDetail: async (footprintId) => {
    try {
      const post = await Footprint.findOne({
        include: [
          {
            model: FootprintImage,
            attributes: ['url'],
            as: 'footprintImage',
          },
          {
            model: User,
            attributes: ['name'],
            as: 'user',
          },
        ],
        where: {
          id: footprintId,
          isDeleted: false,
        },
      });
      return post;
    } catch (error) {
      throw error;
    }
  },
  updatePost: async (footprintId, content) => {
    try {
      await Footprint.update(
          {
            content,
          },
          {
            where: {
              id: footprintId,
            },
          },
      );
    } catch (error) {
      throw error;
    }
  },
  deletePost: async (footprintId) => {
    try {
      await Footprint.update(
          {
            isDeleted: true,
          },
          {
            where: {
              id: footprintId,
            },
          },
      );
    } catch (error) {
      throw error;
    }
  },
  getComment: async (footprintId, page = 1, limit = 5) => {
    try {
      page = parseInt(page);
      limit = parseInt(limit);

      if (isNaN(page)) {
        page = 1;
      }
      if (isNaN(limit)) {
        limit = 5;
      }

      const offset = (page - 1) * limit;
      const comments = await FootprintComment.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
            as: 'user',
          },
        ],
        where: {
          footprint_id: footprintId,
          isDeleted: false,
        },
        order: [['createdAt', 'DESC']],
        offset: offset,
        limit: limit,
      });
      return comments;
    } catch (error) {
      throw error;
    }
  },
  postComment: async ({userId, footprintId, content}) => {
    try {
      await FootprintComment.create({
        user_id: userId,
        footprint_id: footprintId,
        content,
      });
    } catch (error) {
      throw error;
    }
  },
  deleteComment: async (commentId) => {
    try {
      await FootprintComment.update(
          {
            isDeleted: true,
          },
          {
            where: {
              id: commentId,
            },
          },
      );
    } catch (error) {
      throw error;
    }
  },
};

export default footprintService;
