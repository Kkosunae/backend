import { models } from '../models/index.js';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import config from 'config';
import {Op} from 'sequelize';

const { User, SocialLogin, Follow, FollowHistory } = models;
export const isMember = async (authId) => {
  try {
    // id가 authId이고 user_id가 null이 아닌 경우
    const socialLogin = await SocialLogin.findOne({
      where: {
        id: authId,
        user_id: {
          [Op.ne]: null,
        },
      },
    });

    if (socialLogin) {
      return socialLogin.id;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

export const createSocialLogin = async (type, data) => {
  try {
    const authId = data.id;
    if (type == 'kakao') {
      const socialLogin = await SocialLogin.create({
        auth_type: type,
        auth_id: authId,
        name: data.properties.nickname,
        email: data.kakao_account.email,
        user_id: null,
      });
      return socialLogin.id;
    } else if (type == 'google') {
      const socialLogin = await SocialLogin.create({
        type: type,
        id: data.sub,
        name: data.name,
        email: data.email,
        user_id: null,
      });
      return socialLogin.id;
    }
  } catch (error) {
    console.error(error);
  }
};


export const signInKakao = async (kakaoToken) => {
  let result = {};

  try {
    result = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${kakaoToken}`,
      },
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const err = new Error('유효하지 않은 토큰입니다.');
      err.response = error.response;
      throw err;
    }
    const err = new Error('카카오 로그인에 실패했습니다.');
    err.response = error.response;
    throw err;
  }
  const kakaoData = result.data;
  return kakaoData;
};

export const userJoin = async (authId, birthday, gender) => {
  try {
    // user 테이블에 auth_id 컬럼 추가
    const newUser = await User.create({
      birthday: birthday,
      gender: gender,
    });

    // social_login 테이블의 user_id 컬럼에 user.id 추가하고 type 리턴
    const socialLogin = await SocialLogin.update({
      user_id: newUser.id,
    }, {
      where: {
        id: authId,
      },
    });
    return newUser.id;
  } catch (error) {
    const err = new Error('회원가입에 실패했습니다.');
    err.response = error.response;
    throw err;
  }
};


export const signInGoogle = async (googleToken) => {
  let result = {};

  try {
    result = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${googleToken}`,
      },
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const err = new Error('유효하지 않은 토큰입니다.');
      err.response = error.response;
      throw err;
    }
    const err = new Error('구글 로그인에 실패했습니다.');
    err.response = error.response;
    throw err;
  }
  const googleData = result.data;
  return googleData;
};

export const followService = {
  // 존재하는 팔로우인지 확인
  isExistingFollow: async (follower_id, following_id) => {
    try {
      const follow = await Follow.findOne({ where: { follower_id, following_id } });
    } catch (error) {
      throw new Error('Failed to check if the user is already following.');
    }
    if (follow) {
      return follow.id;
    }
  },
  follow: async (followerId, followingId) => {
    try {
      const follow = await Follow.create({
        follower_id: followerId,
        following_id: followingId,
      });
      await FollowHistory.create({
        follow_id: follow.id,
        follower_id: followerId,
        following_id: followingId,
        action: 'follow',
      });

      // 예: 사용자의 팔로워 수, 팔로잉 수 업데이트 등
    } catch (error) {
      throw new Error('Failed to follow the user.');
    }
  },

  unfollow: async (followerId, followingId) => {
    try {
      const follow = await Follow.findOne({ where: { follower_id, following_id } });

      await Follow.destroy({ where: { follower_id, following_id } });
      await FollowHistory.create({
        follow_id: follow.id,
        follower_id: followerId,
        following_id: followingId,
        action: 'unfollow',
      });

    } catch (error) {
      throw new Error('Failed to unfollow the user.');
    }
  },
};

export const getJwt = (userId) => {
  const newJwt = jwt.sign(
      {
        id: userId,
      },
      config.get('jwt.token_secret'),
      {
        expiresIn: '2m',
      },
  );

  return newJwt;
};
