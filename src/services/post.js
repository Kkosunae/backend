import {models} from '../models/index.js';

const {Post, PostImage} = models;

//* 활성 유저인지 확인
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

export default {
  createPost,
};

