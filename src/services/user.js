import {User} from '../models/index.js';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import config from 'config';


export const signInKakao = async (kakaoToken) => {
  let result = {};
  let type = 'login';

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
            expiresIn: '1m',
          },
      ),
    };
  } catch (error) {
    console.error(error);
  }
};
