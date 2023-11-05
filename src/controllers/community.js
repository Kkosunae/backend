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
      if (content.length > 1000) {
        return res.status(400).json({message: '게시글은 1000자를 초과할 수 없습니다.'});
      }
      const images = req.files;
      const imageUrls = images.map((image) => image.location);

      const newCommunityPost = await communityService.createPost({userId, content, imageUrls});

      return res.status(201).json({message: '글 작성에 성공했습니다.'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({message: '글 작성 중 오류가 발생했습니다.'});
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
      return res.status(500).json({message: '게시글 조회 중 오류가 발생했습니다.'});
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
      return res.status(500).json({message: '게시글 조회 중 오류가 발생했습니다.'});
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
        return res.status(403).json({message: '권한이 없습니다.'});
      }

      await communityService.updatePost(postId, content);
      return res.status(200).json({message: '게시글이 수정되었습니다.'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({message: '게시글 수정 중 오류가 발생했습니다.'});
    }
  },
  // 게시물 삭제
  // req.userId가 글 작성자인지 먼저 확인
  // 글 작성자가 아니면 403 반환
  deletePost: async (req, res) => {
    try {
      const userId = req.userId;
      const {postId} = req.params;
      const userIdOfPost = await communityService.getUserId(postId);

      if (userIdOfPost !== userId) {
        return res.status(403).json({message: '권한이 없습니다.'});
      }

      await communityService.deletePost(postId);
      return res.status(200).json({message: '게시글이 삭제되었습니다.'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({message: '게시글 삭제 중 오류가 발생했습니다.'});
    }
  },
  searchPost: async (req, res) => {
    try {
      const {keyword} = req.query;
      const posts = await communityService.searchPost(keyword);
      return res.status(200).json({posts});
    } catch (error) {
      console.error(error);
      return res.status(500).json({message: '게시글 조회 중 오류가 발생했습니다.'});
    }
  },
  postComment: async (req, res) => {
    try {
      const userId = req.userId;
      const {postId} = req.params;
      const {content} = req.body;

      // 글자 수 150자 제한
      if (content.length > 150) {
        return res.status(400).json({message: '댓글은 150자를 초과할 수 없습니다.'});
      }

      await communityService.postComment({userId, postId, content});
      return res.status(201).json({message: '댓글 작성에 성공했습니다.'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({message: '댓글 작성 중 오류가 발생했습니다.'});
    }
  },
  deleteComment: async (req, res) => {
    try {
      const userId = req.userId;
      const {commentId} = req.params;
      const userIdOfPost = await communityService.getUserId(commentId);

      if (userIdOfPost !== userId) {
        return res.status(403).json({message: '권한이 없습니다.'});
      }

      await communityService.deleteComment(postId);
      return res.status(200).json({message: '게시글이 삭제되었습니다.'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({message: '게시글 삭제 중 오류가 발생했습니다.'});
    }
  },
};

export default communityController;
