import {models} from '../models/index.js';
import Sequelize from 'sequelize';
const {Op} = Sequelize;

const {CommunityPost, CommunityPostImage, CommunityPostComment, User} = models;

export const communityService = {
  // 게시글을 작성한 유저의 id 가져오기
  getUserId: async (postId) => {
    try {
      const post = await CommunityPost.findOne({
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
      const comment = await CommunityPostComment.findOne({
        where: {
          id: commentId,
        },
      });
      return comment.user_id;
    } catch (error) {
      throw error;
    }
  },
  createPost: async ({userId, content, imageUrls}) => {
    try {
      // 게시물 생성
      const newCommunityPost = await CommunityPost.create({
        content,
        user_id: userId,
        isDeleted: false,
      });

      // 이미지 URL 저장
      if (imageUrls && imageUrls.length > 0) {
        const imageRecords = imageUrls.map((url) => ({
          url,
          community_post_id: newCommunityPost.id, // 게시물과 이미지 연결
        }));

        await CommunityPostImage.bulkCreate(imageRecords);
      }

      return newCommunityPost;
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
      const posts = await CommunityPost.findAll({
        include: [
          {
            model: CommunityPostImage,
            attributes: ['url'],
            as: 'communityPostImage',
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
      const post = await CommunityPost.findOne({
        include: [
          {
            model: CommunityPostImage,
            attributes: ['url'],
            as: 'communityPostImage',
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
      await CommunityPost.update(
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
      await CommunityPost.update(
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
  searchPost: async (keyword) => {
    try {
      const posts = await CommunityPost.findAll({
        include: [
          {
            model: CommunityPostImage,
            attributes: ['url'],
            as: 'communityPostImage',
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
        },
      });
      return posts;
    } catch (error) {
      throw error;
    }
  },
  postComment: async ({userId, postId, content}) => {
    try {
      await CommunityPostComment.create({
        user_id: userId,
        community_post_id: postId,
        content,
      });
    } catch (error) {
      throw error;
    }
  },
  deleteComment: async (postId) => {
    try {
      await CommunityPostComment.update(
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

export default communityService;
