import {User} from '../models/index.js';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import config from 'config';


export const signInKakao = async (kakaoToken) => {
  let result = {};
  let type = 'login';
  let id = '';

  try {
    result = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${kakaoToken}`,
      },
    });
    console.log(result.data);
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
  try {
    const authId = result.data.id;
    const authIdExists = await User.findOne({
      where: {
        auth_id: authId,
      },
    });

    if (authIdExists) {
      id = authIdExists.id;
      console.log('auth_id exists');
    } else {
      type = 'register';
      // user 테이블에 auth_id 컬럼 추가
      const newUser = await User.create({
        auth_id: authId,
        auth_type: 'kakao',
        name: result.data.properties.nickname,
        email: result.data.kakao_account.email,
        gender: result.data.kakao_account.gender,
        birthday: result.data.kakao_account.birthday,
      });
      id = newUser.id;
    }

    return {
      'type': type,
      'jwt': jwt.sign(
          {
            id: authId,
            type: 'kakao',
          },
          config.get('jwt.token_secret'),
          {
            expiresIn: '2m',
          },
      ),
      'user_id': id,
    };
  } catch (error) {
    console.error(error);
  }
};


export const signInGoogle = async (googleToken) => {
  let result = {};
  let type = 'login';
  let userId = '';
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

  try {
    const authId = result.data.id;
    console.log(authId);
    const authIdExists = await User.findOne({
      where: {
        auth_id: authId,
      },
    });

    if (authIdExists) {
      userId = authIdExists.id;
      console.log('auth_id exists');
    } else {
      type = 'register';
      // user 테이블에 auth_id 컬럼 추가
      const newUser = await User.create({
        auth_id: authId,
        auth_type: 'google',
        name: result.data.name,
        email: result.data.email,
        gender: result.data.kakao_account.gender,
        birthday: result.data.kakao_account.birthday,
      });
      userId = newUser.id;
    }

    return {
      'type': type,
      'jwt': jwt.sign(
          {
            id: authId,
            type: 'google',
          },
          config.get('jwt.token_secret'),
          {
            expiresIn: '2m',
          },
      ),
      'user_id': userId,
    };
  } catch (error) {
    console.error(error);
  }
};

