import {models} from '../models/index.js';
import Sequelize from 'sequelize';
const {Op} = Sequelize;

const {Post, PostImage} = models;

export const postService = {
  createPost: async (userId, content, latitude, longitude, imageUrls) => {
    try {
      // 게시물 생성
      const newPost = await Post.create({
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
          post_id: newPost.id, // 게시물과 이미지 연결
        }));

        await PostImage.bulkCreate(imageRecords);
      }

      return newPost;
    } catch (error) {
      throw error;
    }
  },
  getPost: async (latitude, longitude) => {
    try {
      const radius = 300; // 300m

      const posts = await Post.findAll({
        include: [
          {
            model: PostImage,
            attributes: ['url'],
            as: 'postImage',
          },
        ],
        where: Sequelize.literal(
            `ST_DWithin(
            geom, 
            ST_MakePoint(${longitude}, ${latitude})::geography, 
            ${radius}
          )`,
        ),
      });

      return posts;
    } catch (error) {
      throw error;
    }
  },
};

export default postService;
