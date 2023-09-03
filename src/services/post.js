
//* 활성 유저인지 확인
export const createPost = async ({title, content, authorId}) => {
  try {
    const newPost = new Post({
      title,
      content,
      author: authorId,
    });

    // 새 글을 저장하고 반환
    return await newPost.save();
  } catch (error) {
    throw error;
  }
};

export default {
  createPost,
};

