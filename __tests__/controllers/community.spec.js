'use strict';

import c from 'config';
import communityService from '../services/community.js';
import config from 'config';

// import {success, fail} from '../util/responseStatus.js';

const communityController = {
  createPost: async (req, res) => {
    try {
      const userId = req.userId;

      const {content} = req.body; // 클라이언트에서 전송된 데이터

      if (!content) {
        return res.status(400).json({error: '필수 정보가 누락되었습니다.'});
      }
      if (content.length > 1000) {
        return res.status(400).json({error: '게시글은 1000자를 초과할 수 없습니다.'});
      }
      const images = req.files;
      console.log(images);
      const imageUrls = images.map((image) => image.location);

      const newCommunity = await communityService.createPost({userId, content, imageUrls});

      return res.status(200).json({
        message: '글 작성에 성공했습니다.',
        post: newCommunity,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '글 작성 중 오류가 발생했습니다.'});
    }
  },
  // 글 개수는 디폴트는 5개
  // 글 개수와 페이지를 받아서 최신순으로 정렬해서 보내줌
  getPost: async (req, res) => {
    try {
      const {page, limit} = req.query;
      const posts = await communityService.getPost(page, limit);

      return res.status(200).json({posts});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '게시글 조회 중 오류가 발생했습니다.'});
    }
  },
  // 게시물 상세 조회
  getPostDetail: async (req, res) => {
    try {
      const {postId} = req.params;
      const post = await communityService.getPostDetail(postId);
      return res.status(200).json({post});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '게시글 조회 중 오류가 발생했습니다.'});
    }
  },
  // 게시물 수정
  // req.userId가 글 작성자인지 먼저 확인
  // 글 작성자가 아니면 403 반환
  updatePost: async (req, res) => {
    try {
      const userId = req.userId;
      const {postId} = req.params;
      const {content} = req.body;

      const userIdOfPost = await communityService.getUserId(postId);

      if (userIdOfPost !== userId) {
        return res.status(403).json({error: '권한이 없습니다.'});
      }

      await communityService.updatePost(postId, content);
      return res.status(200).json({message: '게시글이 수정되었습니다.'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '게시글 수정 중 오류가 발생했습니다.'});
    }
  },
  // 게시물 삭제
  // req.userId가 글 작성자인지 먼저 확인
  // 글 작성자가 아니면 403 반환
  deletePost: async (req, res) => {
    try {
      const userId = req.userId;
      const {postId} = req.params;
      // postId가 숫자인지 확인
      if (isNaN(postId)) {
        return res.status(400).json({error: '필수 정보가 누락되었습니다.'});
      }

      const userIdOfPost = await communityService.getUserId(postId);

      if (userIdOfPost !== userId) {
        return res.status(403).json({error: '권한이 없습니다.'});
      }

      await communityService.deletePost(postId);
      return res.status(200).json({message: '게시글이 삭제되었습니다.'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '게시글 삭제 중 오류가 발생했습니다.'});
    }
  },
  searchPost: async (req, res) => {
    try {
      const {keyword, page, limit} = req.query;

      const posts = await communityService.searchPost(keyword, page, limit);
      return res.status(200).json({posts});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '게시글 조회 중 오류가 발생했습니다.'});
    }
  },
  getComment: async (req, res) => {
    try {
      const {postId} = req.params;
      const {page, limit} = req.query;

      const comments = await communityService.getComment(postId, page, limit);
      return res.status(200).json({comments});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '댓글 조회 중 오류가 발생했습니다.'});
    }
  },
  postComment: async (req, res) => {
    try {
      const userId = req.userId;
      const {postId} = req.params;
      const {content} = req.body;

      if (!content) {
        return res.status(400).json({error: '필수 정보가 누락되었습니다.'});
      }
      // 글자 수 150자 제한
      if (content.length > 150) {
        return res.status(400).json({error: '댓글은 150자를 초과할 수 없습니다.'});
      }

      // 유효한 postId인지 확인
      const post = await communityService.isValidPost(postId);
      if (!post) {
        return res.status(400).json({error: '유효하지 않은 게시글입니다.'});
      }

      const newComment = await communityService.postComment({userId, postId, content});
      return res.status(200).json({
        message: '댓글 작성에 성공했습니다.',
        comment: newComment,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '댓글 작성 중 오류가 발생했습니다.'});
    }
  },
  deleteComment: async (req, res) => {
    try {
      const userId = req.userId;
      const {postId, commentId} = req.params;

      // 유효한 댓글인지 확인
      const comment = await footprintService.isValidComment(commentId);
      if (!comment) {
        return res.status(400).json({error: '유효하지 않은 댓글입니다.'});
      }

      const userIdOfComment = await communityService.getCommentUserId(commentId);

      if (userIdOfComment !== userId) {
        return res.status(403).json({error: '권한이 없습니다.'});
      }

      await communityService.deleteComment(commentId);
      return res.status(200).json({message: '게시글이 삭제되었습니다.'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '게시글 삭제 중 오류가 발생했습니다.'});
    }
  },
  likePost: async (req, res) => {
    try {
      console.log('likePost');
      const userId = req.userId;
      const {postId} = req.params;

      // 유효한 postId인지 확인
      const post = await communityService.isValidPost(postId);
      if (!post) {
        return res.status(400).json({error: '유효하지 않은 게시글입니다.'});
      }

      const isLike = await communityService.like({userId, postId});
      if (isLike) {
        return res.status(200).json({message: '좋아요를 눌렀습니다.', method: 'like'});
      }
      return res.status(200).json({message: '좋아요를 취소했습니다.', method: 'unlike'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '좋아요 중 오류가 발생했습니다.'});
    }
  },
};

export default communityController;
