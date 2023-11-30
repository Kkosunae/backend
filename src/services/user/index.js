import {models} from '../../models/index.js';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import config from 'config';
import {Op} from 'sequelize';

const {User, SocialLogin} = models;

//* 소셜 id로 회원가입 여부 확인
export const userService = {
  isSocialMemberForLogin: async (type, socialId) => {
    try {
    // 소셜로그인 타입이 일치 + user_id가 null이 아닌 경우 중에 social_id가 일치하는 경우
      const socialLogin = await SocialLogin.findOne({
        where: {
          social_id: socialId,
          type,
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
  },
  isSocialMemberForJoin: async (socialLoginId) => {
    try {
      const socialLogin = await SocialLogin.findOne({
        where: {
          id: socialLoginId,
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
  },
  //* 활성 유저인지 확인
  isActiveUser: async (userId) => {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (user) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
    }
  },
  createSocialLogin: async (type, userData) => {
    try {
      const socialLogin = await SocialLogin.create({
        type,
        social_id: userData.socialId,
        name: userData.name,
        email: userData.email,
      });

      return socialLogin.id;
    } catch (error) {
      console.error(error);
    }
  },
  join: async (socialLoginId, userData) => {
    try {
    // user 테이블에 auth_id 컬럼 추가
      const newUser = await User.create({
        name: userData.name,
        birthday: userData.birthday,
        gender: userData.gender,
      });

      // social_login 테이블의 user_id 컬럼에 user.id 추가하고 type 리턴
      const socialLogin = await SocialLogin.update({
        user_id: newUser.id,
      }, {
        where: {
          id: socialLoginId,
        },
      });
      return newUser.id;
    } catch (error) {
      const err = new Error('회원가입에 실패했습니다.');
      err.response = error.response;
      throw err;
    }
  },
  /* 한국시간 기준 2달 기한의 jwt 발급 */
  getJwt: (userId) => {
    const expiresInDays = 60; // Approximate 2 months as 60 days
    const expiresInSeconds = expiresInDays * 24 * 60 * 60; // Convert to seconds

    const newJwt = jwt.sign(
        {
          id: userId,
        },
        config.get('jwt.token_secret'),
        {
          expiresIn: expiresInSeconds,
        },
    );

    return newJwt;
  },
};

export default userService;
