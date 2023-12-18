'use strict';

import footprintService from '../../services/map/footprint.js';
import config from 'config';

// import {success, fail} from '../util/responseStatus.js';

const footprintController = {
  createFootprint: async (req, res) => {
    try {
      const userId = req.userId;

      const {content, latitude, longitude} = req.body; // 클라이언트에서 전송된 데이터
      if (!content || !latitude || !longitude) {
        return res.status(400).json({error: '필수 정보가 누락되었습니다.'});
      }
      if (content.length > 500) {
        return res.status(400).json({error: '발자국은 500자를 초과할 수 없습니다.'});
      }
      const images = req.files;
      const imageUrls = images.map((image) => image.location);

      const newFootprint = await footprintService.createFootprint(userId, content, latitude, longitude, imageUrls);

      return res.status(200).json({
        message: '발자국 작성에 성공했습니다.',
        footprint: newFootprint,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '발자국 작성 중 오류가 발생했습니다.'});
    }
  },
  // 위도, 경도를 받아서 300m내 게시물을 가져옴
  getFootprint: async (req, res) => {
    try {
      const {latitude, longitude} = req.body;
      console.log(latitude, longitude);
      // 위도, 경도가 숫자인지 확인
      if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({error: '필수 정보가 누락되었습니다.'});
      }

      const footprints = await footprintService.getFootprint(latitude, longitude);
      return res.status(200).json({footprints});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '발자국 조회 중 오류가 발생했습니다.'});
    }
  },
  // 게시물 상세 조회
  getFootprintDetail: async (req, res) => {
    try {
      const {footprintId} = req.params;
      const post = await footprintService.getFootprintDetail(footprintId);
      return res.status(200).json({post});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '발자국 조회 중 오류가 발생했습니다.'});
    }
  },
  // 게시물 수정
  // req.userId가 글 작성자인지 먼저 확인
  // 글 작성자가 아니면 403 반환
  updateFootprint: async (req, res) => {
    try {
      const userId = req.userId;
      const {footprintId} = req.params;
      const {content} = req.body;

      const userIdOfPost = await footprintService.getUserId(footprintId);

      if (userIdOfPost !== userId) {
        return res.status(403).json({error: '권한이 없습니다.'});
      }

      await footprintService.updatePost(footprintId, content);
      return res.status(200).json({message: '발자국이 수정되었습니다.'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '발자국 수정 중 오류가 발생했습니다.'});
    }
  },
  // 게시물 삭제
  // req.userId가 글 작성자인지 먼저 확인
  // 글 작성자가 아니면 403 반환
  deleteFootprint: async (req, res) => {
    try {
      const userId = req.userId;
      const {footprintId} = req.params;
      // footprintId가 숫자인지 확인
      if (isNaN(footprintId)) {
        return res.status(400).json({error: '필수 정보가 누락되었습니다.'});
      }

      const userIdOfPost = await footprintService.getUserId(footprintId);
      console.log(userIdOfPost, userId);

      if (userIdOfPost !== userId) {
        return res.status(403).json({error: '권한이 없습니다.'});
      }

      await footprintService.deletePost(footprintId);
      return res.status(200).json({message: '발자국이 삭제되었습니다.'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '발자국 삭제 중 오류가 발생했습니다.'});
    }
  },
  getComment: async (req, res) => {
    try {
      const {footprintId} = req.params;
      const {page, limit} = req.query;

      const comments = await footprintService.getComment(footprintId, page, limit);
      return res.status(200).json({comments});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '댓글 조회 중 오류가 발생했습니다.'});
    }
  },
  postComment: async (req, res) => {
    try {
      const userId = req.userId;
      const {footprintId} = req.params;
      const {content} = req.body;

      if (!content) {
        return res.status(400).json({error: '필수 정보가 누락되었습니다.'});
      }
      // 글자 수 150자 제한
      if (content.length > 150) {
        return res.status(400).json({error: '댓글은 150자를 초과할 수 없습니다.'});
      }

      // 유효한 footprintId인지 확인
      const footprint = await footprintService.isValidFootprint(footprintId);
      if (!footprint) {
        return res.status(400).json({error: '유효하지 않은 발자국입니다.'});
      }

      const newComment = await footprintService.postComment({userId, footprintId, content});
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
      const {footprintId, commentId} = req.params;
      console.log(footprintId, commentId);

      // 유효한 댓글인지 확인
      const comment = await footprintService.isValidComment(commentId);
      if (!comment) {
        return res.status(400).json({error: '유효하지 않은 댓글입니다.'});
      }

      const userIdOfComment = await footprintService.getCommentUserId(commentId);

      if (userIdOfComment !== userId) {
        return res.status(403).json({error: '권한이 없습니다.'});
      }

      await footprintService.deleteComment(commentId);
      return res.status(200).json({message: '발자국이 삭제되었습니다.'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '발자국 삭제 중 오류가 발생했습니다.'});
    }
  },
};


export default footprintController;
