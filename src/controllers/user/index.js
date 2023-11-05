'use strict';

import userService from '../../services/user/index.js';
// import {success, fail} from '../util/responseStatus.js';

const userController = {
  loginKakao: async (req, res) => {
  // post 로 전달받은 바디에서 토큰 추출
    const accessToken = req.body.accessToken;
    let type = 'register';
    let kakaoData = null;
    try {
      kakaoData = await userService.signInKakao(accessToken);
    } catch (error) {
      if (error.message === '유효하지 않은 토큰입니다.') {
        return res.status(401).json({error: '유효하지 않은 토큰입니다.'});
      } else {
        return res.status(500).json({error: 'Internal Server Error'});
      }
    }
    const userId = await userService.isMember(kakaoData.id);

    if (userId) {
      type = 'login';
      res.status(200).json({
        'type': type,
        'jwt': userService.getJwt(userId),
      });
    } else {
      const socialLoginId = await userService.createSocialLogin('kakao', kakaoData);
      res.status(200).json({
        'type': type,
        'social_login_id': socialLoginId,
      });
    }
  },
  /* 구글 로그인
  access token 테스트 시 아래로 접속하면 됨
  https://accounts.google.com/o/oauth2/auth?client_id=807916056194-gjsoiiocvfnapn7tv7ubsr3jtqq62rqh.apps.googleusercontent.com&redirect_uri=http://127.0.0.1:8080/user/google&scope=profile+email&response_type=token
*/
  loginGoogle: async (req, res) => {
  // post 로 전달받은 바디에서 토큰 추출
    const accessToken = req.body.accessToken;
    let type = 'register';
    let googleData = null;
    try {
      googleData = await userService.signInGoogle(accessToken);
    } catch (error) {
      if (error.message === '유효하지 않은 토큰입니다.') {
        return res.status(401).json({error: '유효하지 않은 토큰입니다.'});
      } else {
        return res.status(500).json({error: 'Internal Server Error'});
      }
    }
    const userId = await userService.isMember(googleData.id);

    if (userId) {
      type = 'login';
      res.status(200).json({
        'type': type,
        'jwt': userService.getJwt(userId),
      });
    } else {
      const socialLoginId = await userService.createSocialLogin('google', googleData);
      res.status(200).json({
        'type': type,
        'social_login_id': socialLoginId,
      });
    }
  },
  join: async (req, res) => {
    const {birthday, gender} = req.body;
    const socialLoginId = req.body.social_login_id;
    const userId = await userService.isMember(socialLoginId);
    if (!socialLoginId) {
      return res.status(400).json({error: 'social_login_id 가 없습니다.'});
    }

    if (userId) {
      return res.status(409).json({error: '이미 가입된 회원입니다.'});
    }

    try {
      const newUserId = await userService.userJoin(socialLoginId, birthday, gender);
      const newJwt = userService.getJwt(newUserId);

      res.status(200).json({
        'jwt': newJwt,
      });
    } catch (error) {
      return res.status(500).json({error: 'Failed to join.'});
    }
  },
};

export default userController;
