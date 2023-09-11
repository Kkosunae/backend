import {models} from '../models/index.js';
import Sequelize from 'sequelize';
const {Op} = Sequelize;

const {Post, PostImage} = models;

export const createPost = async ({userId, content, latitude, longitude, imageUrls}) => {
  try {
    // 게시물 생성
    const newPost = await Post.create({
      content,
      latitude,
      longitude,
      user_id: userId,
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
};

export const getPost = async (latitude, longitude) => {
  try {
    const radius = 0.3; // 300m를 킬로미터로 환산
    const earthRadius = 6371; // 지구 반지름 (킬로미터)

    const posts = await Post.findAll({
      include: [
        {
          model: PostImage,
          attributes: ['url'],
          as: 'postImage',
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
    return posts;
  } catch (error) {
    throw error;
  }
};

export default {
  createPost,
  getPost,
};

