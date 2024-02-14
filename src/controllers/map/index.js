'use strict';

import mapService from '../../services/map/index.js';
import config from 'config';

// import {success, fail} from '../util/responseStatus.js';

const mapController = {
  getPlacesAndFootprintsInfo: async (req, res) => {
    try {
      const userId = req.userId;

      const {latitude, longitude, distance} = req.body;
      const radius = distance || '300';
      const places = await mapService.getPlaces(radius, latitude, longitude);
      const footprints = await mapService.getFootprintsWithoutMine(userId, radius, latitude, longitude);
      const myFootprints = await mapService.getMyFootprints(userId, radius, latitude, longitude);
      return res.status(200).json({places, footprints, myFootprints});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: '장소 정보 조회 중 오류가 발생했습니다.'});
    }
  },
};


export default mapController;
