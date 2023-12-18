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
};


export default mapController;
