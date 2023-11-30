'use strict';

import userService from '../../services/user/index.js';
// import {success, fail} from '../util/responseStatus.js';

const userController = {
  socialLogin: async (req, res, socialType) => {
    const {socialId, name, email} = req.body;
    let type = 'register';

    // 필수 파라미터
    if (!socialId) {
      return res.status(400).json({error: 'socialId 가 없습니다.'});
    }

    const socialLoginId = await userService.isSocialMemberForLogin(socialType, socialId);

    if (socialLoginId) {
      type = 'login';
      res.status(200).json({
        'type': type,
        'jwt': userService.getJwt(socialLoginId),
      });
    } else {
      const newSocialLoginId = await userService.createSocialLogin(socialType, {socialId, name, email});
      res.status(200).json({
        'type': type,
        'socialLoginId': newSocialLoginId,
      });
    }
  },
  join: async (req, res) => {
    const {socialLoginId, name, birthday, gender} = req.body;

    // 필수 파라미터
    if (!socialLoginId) {
      return res.status(400).json({error: 'socialLoginId 가 없습니다.'});
    }

    // 가입한 회원인지 확인
    const userId = await userService.isSocialMemberForJoin(socialLoginId);
    if (userId) {
      return res.status(409).json({error: '이미 가입된 회원입니다.'});
    }

    try {
      const newUserId = await userService.join(socialLoginId, {name, birthday, gender});
      const newJwt = userService.getJwt(newUserId);

      res.status(200).json({
        'userId': newUserId,
        'jwt': newJwt,
      });
    } catch (error) {
      return res.status(500).json({error: 'Failed to join.'});
    }
  },
};


export default userController;
