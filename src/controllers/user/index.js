'use strict';

import {
  signInKakao,
  signInGoogle,
  userJoin,
  createSocialLogin,
  isMember,
  getJwt,
} from '../../services/user/index.js';
// import {success, fail} from '../util/responseStatus.js';

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
  if (!socialLoginId) {
    return res.status(400).json({error: 'social_login_id 가 없습니다.'});
  }

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

export default {
  loginKakao,
  loginGoogle,
  join,
};
