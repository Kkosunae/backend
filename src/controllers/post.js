'use strict';

import postService from '../services/post.js';
import {uploadImages} from '../services/aws.js';
import AppleStrategy from 'passport-apple';
import config from 'config';

// import {success, fail} from '../util/responseStatus.js';

const createPost = async (req, res) => {
  try {
    const {title, content, authorId} = req.body; // 클라이언트에서 전송된 데이터
    const images = req.files;
    console.log(images);

    const imageUrls = await uploadImages(images);
    console.log(imageUrls);
    // 글 작성 서비스 호출
    // const newPost = await postService.createPost({title, content, authorId});

    return res.status(201).json(imageUrls);
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: '글 작성 중 오류가 발생했습니다.'});
  }
};
export default {
  createPost,
};
