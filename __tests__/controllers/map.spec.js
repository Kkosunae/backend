'use strict';

import mapService from '../services/map.js';
import config from 'config';

// import {success, fail} from '../util/responseStatus.js';

const mapController = {
  getPlaceInfo: async (req, res) => {
    try {
      const {latitude, longitude} = req.body;
      const placeInfo = await mapService.getPlaceInfo(latitude, longitude);
      return res.status(200).json({placeInfo});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '장소 정보 조회 중 오류가 발생했습니다.'});
    }
  },
  // 장소 신고 API
  complainPlace: async (req, res) => {
    try {
      const {mapId, reason} = req.body;
      const userId = req.userId;
      const complain = await mapService.complainPlace({userId, mapId, reason});
      return res.status(200).json({complain});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '장소 신고 중 오류가 발생했습니다.'});
    }
  },
  // 장소 제보 API
  reportNewPlace: async (req, res) => {
    try {
      const {placeName, placeType, latitude, longitude} = req.body;
      const userId = req.userId;
      const place = await mapService.reportNewPlace({userId, placeName, placeType, latitude, longitude});
      return res.status(200).json({place});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '장소 제보 중 오류가 발생했습니다.'});
    }
  },
};


export default mapController;
