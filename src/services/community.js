import {models} from '../models/index.js';
import Sequelize from 'sequelize';
const {Op} = Sequelize;

const {Community, CommunityImage, CommunityComment, User} = models;

export const communityService = {
  // 게시글을 작성한 유저의 id 가져오기
  getUserId: async (postId) => {
    try {
      const post = await Community.findOne({
        where: {
          id: postId,
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
      const comment = await CommunityComment.findOne({
        where: {
          id: commentId,
        },
      });
      return comment.user_id;
    } catch (error) {
      throw error;
    }
  },
  isValidPost: async (postId) => {
    try {
      const post = await Community.findOne({
        where: {
          id: postId,
          isDeleted: false,
        },
      });
      return post;
    } catch (error) {
      throw error;
    }
  },
  isValidComment: async (commentId) => {
    try {
      const comment = await CommunityComment.findOne({
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
  createPost: async ({userId, content, imageUrls}) => {
    try {
      // 게시물 생성
      const newCommunity = await Community.create({
        content,
        user_id: userId,
        isDeleted: false,
      });

      // 이미지 URL 저장
      if (imageUrls && imageUrls.length > 0) {
        const imageRecords = imageUrls.map((url) => ({
          url,
          community_id: newCommunity.id, // 게시물과 이미지 연결
        }));

        await CommunityImage.bulkCreate(imageRecords);
      }

      return newCommunity;
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
      const posts = await Community.findAll({
        include: [
          {
            model: CommunityImage,
            attributes: ['url'],
            as: 'communityImage',
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
  getPostDetail: async (postId) => {
    try {
      const post = await Community.findOne({
        include: [
          {
            model: CommunityImage,
            attributes: ['url'],
            as: 'communityImage',
          },
          {
            model: User,
            attributes: ['name'],
            as: 'user',
          },
        ],
        where: {
          id: postId,
          isDeleted: false,
        },
      });
      return post;
    } catch (error) {
      throw error;
    }
  },
  updatePost: async (postId, content) => {
    try {
      await Community.update(
          {
            content,
          },
          {
            where: {
              id: postId,
            },
          },
      );
    } catch (error) {
      throw error;
    }
  },
  deletePost: async (postId) => {
    try {
      await Community.update(
          {
            isDeleted: true,
          },
          {
            where: {
              id: postId,
            },
          },
      );
    } catch (error) {
      throw error;
    }
  },
  searchPost: async (keyword, page = 1, limit = 5) => {
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
      const posts = await Community.findAll({
        include: [
          {
            model: CommunityImage,
            attributes: ['url'],
            as: 'communityImage',
          },
          {
            model: User,
            attributes: ['name'],
            as: 'user',
          },
        ],
        where: {
          content: {
            [Op.like]: `%${keyword}%`,
          },
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
  getComment: async (postId, page = 1, limit = 5) => {
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
      const comments = await CommunityComment.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
            as: 'user',
          },
        ],
        where: {
          community_id: postId,
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
  postComment: async ({userId, postId, content}) => {
    try {
      await CommunityComment.create({
        user_id: userId,
        community_id: postId,
        content,
      });
    } catch (error) {
      throw error;
    }
  },
  deleteComment: async (commentId) => {
    try {
      await CommunityComment.update(
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
  // community 모델의 likes 에 user id 가 없으면 likes 칼럼에 userId 추가
  // 있으면 likes 칼럼에서 userId 삭제
  like: async (userId, postId) => {
    try {
      const post = await Community.findOne({
        where: {
          id: postId,
        },
      });

      const likes = post.likes;
      const index = likes.indexOf(userId);
      let isLike = true;

      if (index === -1) {
        // 좋아요를 누른 상태가 아니라면
        likes.push(userId);
      } else {
        // 좋아요를 누른 상태라면
        likes.splice(index, 1);
        isLike = false;
      }

      await Community.update(
          {
            likes,
          },
          {
            where: {
              id: postId,
            },
          },
      );

      return isLike;
    } catch (error) {
      throw error;
    }
  },
};

export default communityService;
