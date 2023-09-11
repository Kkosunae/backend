'use strict';

import postService from '../services/post.js';
import config from 'config';

// import {success, fail} from '../util/responseStatus.js';

const createPost = async (req, res) => {
  try {
    const userId = req.userId;

    const {content, latitude, longitude} = req.body; // 클라이언트에서 전송된 데이터
    const images = req.files;
    const imageUrls = images.map((image) => image.location);

    const newPost = await postService.createPost({userId, content, latitude, longitude, imageUrls});

    return res.status(201).json({message: '글 작성에 성공했습니다.'});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: '글 작성 중 오류가 발생했습니다.'});
  }
};

const getPost = async (req, res) => {
  try {
    const {latitude, longitude} = req.body;
    const posts = await postService.getPost(latitude, longitude);
    return res.status(200).json({posts});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: '게시글 조회 중 오류가 발생했습니다.'});
  }
};


export default {
  createPost,
  getPost,
};
