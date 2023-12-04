'use strict';

import footprintService from '../../services/map/footprint.js';
import config from 'config';

// import {success, fail} from '../util/responseStatus.js';

const footprintController = {
  createFootprint: async (req, res) => {
    try {
      const userId = req.userId;

      const {content, latitude, longitude} = req.body; // 클라이언트에서 전송된 데이터
      if (content.length > 2200) {
        return res.status(400).json({message: '게시글은 2200자를 초과할 수 없습니다.'});
      }
      const images = req.files;
      const imageUrls = images.map((image) => image.location);

      const newFootprint = await footprintService.createFootprint(userId, content, latitude, longitude, imageUrls);

      return res.status(201).json({message: '글 작성에 성공했습니다.'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({message: '글 작성 중 오류가 발생했습니다.'});
    }
  },
  getFootprint: async (req, res) => {
    try {
      const {latitude, longitude} = req.body;
      const footprints = await footprintService.getFootprint(latitude, longitude);
      return res.status(200).json({footprints});
    } catch (error) {
      console.error(error);
      return res.status(500).json({message: '게시글 조회 중 오류가 발생했습니다.'});
    }
  },
};


export default footprintController;
