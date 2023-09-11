const validatePost = (req, res, next) => {
  console.log(11111);
  const {content, latitude, longitude} = req.body;
  console.log(req.body);

  // 게시글 길이가 2200자를 초과하면 오류 응답
  if (content.length > 2200) {
    return res.status(400).json({message: '게시글은 2200자를 초과할 수 없습니다.'});
  }

  next(); // 검증 통과 시 다음 미들웨어 또는 컨트롤러로 이동
};

export default validatePost;

