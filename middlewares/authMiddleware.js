import jwt from 'jsonwebtoken';
import config from 'config';

const authMiddleware = (req, res, next) => {
  // JWT 토큰을 요청 헤더에서 추출.
  const token = req.header('Authorization');

  // 로그인 했을 때
  if (token) {
    try {
      const decodedToken = jwt.verify(token, config.get('jwt.token_secret'));
      req.userId = decodedToken.id;
    } catch (error) {
      req.userId = null;
    }
  } else {
    // 토큰이 없는 경우 req.userId 비움.
    req.userId = null;
  }

  next();
};

export default authMiddleware;