'use strict';

import userService from '../../services/user/index.js';
// import {success, fail} from '../util/responseStatus.js';

const userController = {
  socialLogin: async (req, res, socialType) => {
    console.log(req.body);
    const {socialId, name, email} = req.body;
    let type = 'register';

    // 필수 파라미터
    if (!socialId) {
      return res.status(400).json({error: 'socialId 가 없습니다.'});
    }

    const socialLoginId = await userService.isSocialMemberForLogin(socialType, socialId);

    if (socialLoginId) {
      type = 'login';
      return res.status(200).json({
        'type': type,
        'jwt': userService.getJwt(socialLoginId),
      });
    } else {
      const newSocialLoginId = await userService.createSocialLogin(socialType, {socialId, name, email});
      return res.status(200).json({
        'type': type,
        'socialLoginId': newSocialLoginId,
      });
    }
  },
  join: async (req, res) => {
    const {socialLoginId, name, birthday, gender} = req.body;

    // 필수 파라미터
    if (!socialLoginId) {
      return res.status(400).json({error: '필수 정보가 누락되었습니다.'});
    }

    // YYYYMMDD 형식인지 확인
    if (birthday && !isValidBirthday(birthday)) {
      return res.status(400).json({error: '생년월일은 YYYYMMDD 형식으로 입력해주세요.'});
    }

    if (gender && !(gender == 'male' || gender == 'female')) gender = 'male';

    // 가입한 회원인지 확인
    const userId = await userService.isSocialMemberForJoin(socialLoginId);
    if (userId) {
      return res.status(409).json({error: '이미 가입된 회원입니다.'});
    }

    try {
      const newUserId = await userService.join(socialLoginId, {name, birthday, gender});
      const newJwt = userService.getJwt(newUserId);

      return res.status(200).json({
        'userId': newUserId,
        'jwt': newJwt,
      });
    } catch (error) {
      return res.status(500).json({error: 'Failed to join.'});
    }
  },
};

const isValidBirthday = (birthday) => {
  const regex = /^[0-9]{8}$/;
  return regex.test(birthday);
};


export default userController;
