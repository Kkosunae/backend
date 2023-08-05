'use strict';


import express from 'express';
import {signInKakao, signInGoogle, userJoin, createSocialLogin, followService, isMember, getJwt} from '../services/user.js';
import config from 'config';
import axios from 'axios';
import {success, fail} from '../util/responseStatus.js';

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
  getFollowingList: async (req, res) => {
    if (!req.params.userId) {
      return res.status(401).json({error: 'Unauthorized'});
    }
    const userId = req.params.userId;
    try {
      const followList = await followService.getFollowingList(userId);
      return res.status(200).json({
        message: '팔로우 목록을 성공적으로 가져왔습니다.',
        followList: followList,
        followCount: followList.length,
      });
    } catch (error) {
      return res.status(500).json({error: '팔로우 목록을 가져오는데 실패하였습니다.'});
    }
  },
  getFollowerList: async (req, res) => {
    if (!req.params.userId) {
      return res.status(401).json({error: 'Unauthorized'});
    }
    const userId = req.params.userId;
    try {
      const followList = await followService.getFollowerList(userId);
      return res.status(200).json({
        message: '팔로워 목록을 성공적으로 가져왔습니다.',
        followList: followList,
        followCount: followList.length,
      });
    } catch (error) {
      return res.status(500).json({error: '팔로워 목록을 가져오는데 실패하였습니다.'});
    }
  },
  followUser: async (req, res) => {
    if (!req.userId || !req.body.followingId) {
      return res.status(401).json({error: 'Unauthorized'});
    }

    const followerId = req.userId;
    const {followingId} = req.body;

    if (followerId.toString() === followingId.toString()) {
      return res.status(500).json({error: '본인을 팔로우할 수 없습니다.'});
    }
    try {
      const isExistingFollow = await followService.isExistingFollow(followerId, followingId);

      if (!isExistingFollow) {
        await followService.follow(followerId, followingId);
      } else {
        return res.status(409).json({error: '이미 팔로우한 유저입니다.'});
      }
      return res.status(200).json({
        message: '성공적으로 팔로우 하였습니다.',
      });
    } catch (error) {
      res.status(500).json({error: '팔로우에 실패하였습니다.'});
    }
  },

  unfollowUser: async (req, res) => {
    if (!req.userId || !req.body.followingId) {
      return res.status(401).json({error: 'Unauthorized'});
    }

    const followerId = req.userId;
    const {followingId} = req.body;

    if (followerId.toString() === followingId.toString()) {
      return res.status(500).json({error: '본인을 언팔로우할 수 없습니다.'});
    }
    try {
      const isExistingFollow = await followService.isExistingFollow(followerId, followingId);
      if (isExistingFollow) {
        await followService.unfollow(followerId, followingId);
      } else {
        return res.status(409).json({error: '팔로우하지 않은 유저입니다'});
      }

      return res.status(200).json({
        message: '성공적으로 언팔로우 하였습니다.',
      });
    } catch (error) {
      res.status(500).json({error: '언팔로우에 실패하였습니다.'});
    }
  },
};


export default {
  loginKakao,
  loginGoogle,
  join,
  followingController,
};
