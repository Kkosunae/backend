'use strict';

import c from 'config';
import WalkService from '../services/walk.js';
import config from 'config';

// import {success, fail} from '../util/responseStatus.js';
const walkService = new WalkService();

const startWalk = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({error: 'Unauthorized'});
    }

    const userId = req.userId;
    const {latitude, longitude} = req.body;
    const isWalking = await walkService.isWalking(userId);
    if (isWalking) {
      return res.status(400).json({error: '이미 산책 중입니다.'});
    }
    const walk = await walkService.startWalk(userId, latitude, longitude);
    return res.status(200).json({
      message: '산책을 시작했습니다.',
      walkId: walk.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('산책 시작 중 오류가 발생했습니다.');
  }
};

const endWalk = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({error: 'Unauthorized'});
    }

    const userId = req.userId;
    const {walkId, latitude, longitude} = req.body;

    const isValidWalk = await walkService.isValidWalk(userId, walkId, latitude, longitude);
    if (!isValidWalk) {
      return res.status(400).json({error: '진행중인 산책이 아닙니다.'});
    }
    const walk = await walkService.endWalk(userId, walkId, latitude, longitude);

    return res.status(200).json({
      message: '산책을 종료했습니다.',
      walkId: walk.id,
      startTime: walk.startTime,
      endTime: walk.endTime,
      duration: walk.duration,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('산책 종료 중 오류가 발생했습니다.');
  }
};

const getStatistics = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({error: 'Unauthorized'});
    }

    const userId = req.userId;
    const totalStatistics = await walkService.getTotalStatistics(userId);
    const recentWalk = await walkService.getRecentWalk(userId);
    const dailyStatistics = await walkService.getDailyStatistics(userId);
    const weeklyStatistics = await walkService.getWeeklyStatistics(userId);
    const monthlyStatistics = await walkService.getMonthlyStatistics(userId);

    return res.status(200).json({
      total: totalStatistics,
      recent: recentWalk,
      daily: dailyStatistics,
      weekly: weeklyStatistics,
      monthly: monthlyStatistics,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('통계 조회 중 오류가 발생했습니다.');
  }
};


export default {
  startWalk,
  endWalk,
  getStatistics,
};
