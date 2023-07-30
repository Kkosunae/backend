'use strict';


import express from 'express';
import {signInKakao, signInGoogle, userJoin, createSocialLogin, followService, isMember, getJwt} from '../services/user.js';
import config from 'config';
import axios from 'axios';

const loginKakao = async (req, res) => {
  // post 로 전달받은 바디에서 토큰 추출
  const accessToken = req.body.accessToken;
  let type = 'register';
  let kakaoData = null;
  try {
    kakaoData = await signInKakao(accessToken);
  } catch (error) {
    if (error.message === '유효하지 않은 토큰입니다.') {
      return res.status(401).json({error: '유효하지 않은 토큰입니다.'});
    } else {
      return res.status(500).json({error: 'Internal Server Error'});
    }
  }
  const userId = await isMember(kakaoData.id);

  if (userId) {
    type = 'login';
    res.status(200).json({
      'type': type,
      'jwt': getJwt(userId),
    });
  } else {
    const socialLoginId = await createSocialLogin('kakao', kakaoData);
    res.status(200).json({
      'type': type,
      'social_login_id': socialLoginId,
    });
  }
};

const loginGoogle = async (req, res) => {
  // post 로 전달받은 바디에서 토큰 추출
  const accessToken = req.body.accessToken;
  let type = 'register';
  let googleData = null;
  try {
    googleData = await signInGoogle(accessToken);
  } catch (error) {
    if (error.message === '유효하지 않은 토큰입니다.') {
      return res.status(401).json({error: '유효하지 않은 토큰입니다.'});
    } else {
      return res.status(500).json({error: 'Internal Server Error'});
    }
  }
  const userId = await isMember(googleData.id);

  if (userId) {
    type = 'login';
    res.status(200).json({
      'type': type,
      'jwt': getJwt(userId),
    });
  } else {
    const socialLoginId = await createSocialLogin('google', googleData);
    res.status(200).json({
      'type': type,
      'social_login_id': socialLoginId,
    });
  }
};

const join = async (req, res) => {
  const {birthday, gender} = req.body;
  const socialLoginId = req.body.social_login_id;
  const userId = await isMember(socialLoginId);

  if (userId) {
    return res.status(409).json({error: '이미 가입된 회원입니다.'});
  }

  try {
    const newUserId = await userJoin(socialLoginId, birthday, gender);
    const newJwt = getJwt(newUserId);

    res.status(200).json({
      'jwt': newJwt,
    });
  } catch (error) {
    return res.status(500).json({error: 'Failed to join.'});
  }
};

const followingController = {
  followUser: async (req, res) => {
    const {userId} = req.params;
    const {targetUserId} = req.body;

    try {
      await followService.follow(userId, targetUserId);
      res.status(201).json({message: 'Successfully followed the user.'});
    } catch (error) {
      res.status(500).json({error: 'Failed to follow the user.'});
    }
  },

  unfollowUser: async (req, res) => {
    const {userId} = req.params;
    const {targetUserId} = req.body;

    try {
      await followService.unfollow(userId, targetUserId);
      res.status(200).json({message: 'Successfully unfollowed the user.'});
    } catch (error) {
      res.status(500).json({error: 'Failed to unfollow the user.'});
    }
  },
};


export default {
  loginKakao,
  loginGoogle,
  join,
  followingController,
};
