'use strict';


import express from 'express';
import {signInKakao} from '../services/user.js';

const loginKakao = async (req, res) => {
  try {
    // post 로 전달받은 바디에서 토큰 추출
    const accessToken = req.body.accessToken;

    const result = await signInKakao(accessToken);

    return res.status(200).json(result);
  } catch (error) {
    // Handle error
    if (error.message === '유효하지 않은 토큰입니다.') {
      return res.status(401).json({error: '유효하지 않은 토큰입니다.'});
    } else {
      return res.status(500).json({error: 'Internal Server Error'});
    }
  }
};

export default {
  loginKakao,
};
