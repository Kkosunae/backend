'use strict';

import {followService} from '../../services/user/follow.js';
import {isActiveUser} from '../../services/user/index.js';
// import {success, fail} from '../util/responseStatus.js';

const followController = {
  getFollowingList: async (req, res) => {
    if (!req.params.userId) {
      return res.status(401).json({error: 'Unauthorized'});
    }
    const userId = req.params.userId;
    try {
      const followList = await followService.getFollowingList(userId);
      return res.status(200).json({
        message: '팔로우 목록을 성공적으로 가져왔습니다.',
        followList: followList,
        followCount: followList.length,
      });
    } catch (error) {
      return res.status(500).json({error: '팔로우 목록을 가져오는데 실패하였습니다.'});
    }
  },
  getFollowerList: async (req, res) => {
    if (!req.params.userId) {
      return res.status(401).json({error: 'Unauthorized'});
    }
    const userId = req.params.userId;
    try {
      const followList = await followService.getFollowerList(userId);
      return res.status(200).json({
        message: '팔로워 목록을 성공적으로 가져왔습니다.',
        followList: followList,
        followCount: followList.length,
      });
    } catch (error) {
      return res.status(500).json({error: '팔로워 목록을 가져오는데 실패하였습니다.'});
    }
  },
  followUser: async (req, res) => {
    if (!req.userId || !req.body.userId) {
      return res.status(401).json({error: 'Unauthorized'});
    }

    const followerId = req.userId;
    const followingId = req.body.userId;

    // 본인을 팔로우하거나 활성유저가 아닐 시 팔로우 불가
    if (followerId.toString() === followingId.toString() || !isActiveUser(followingId)) {
      return res.status(403).json({error: '팔로우할 수 없는 유저입니다.'});
    }
    try {
      const isExistingFollow = await followService.isExistingFollow(followerId, followingId);

      if (!isExistingFollow) {
        await followService.follow(followerId, followingId);
      } else {
        return res.status(409).json({error: '이미 팔로우한 유저입니다.'});
      }

      return res.status(200).json({
        message: '성공적으로 팔로우 하였습니다.',
      });
    } catch (error) {
      res.status(500).json({error: '팔로우 실패하였습니다.'});
    }
  },

  unfollowUser: async (req, res) => {
    if (!req.userId || !req.body.userId) {
      return res.status(401).json({error: 'Unauthorized'});
    }

    const followerId = req.userId;
    const followingId = req.body.userId;

    if (followerId.toString() === followingId.toString() || !isActiveUser(followingId)) {
      return res.status(403).json({error: '언팔로우할 수 없는 유저입니다.'});
    }
    try {
      const isExistingFollow = await followService.isExistingFollow(followerId, followingId);

      if (isExistingFollow) {
        await followService.unfollow(followerId, followingId);
      } else {
        return res.status(409).json({error: '팔로우하지 않은 유저입니다'});
      }

      return res.status(200).json({
        message: '성공적으로 언팔로우 하였습니다.',
      });
    } catch (error) {
      res.status(500).json({error: '언팔로우에 실패하였습니다.'});
    }
  },
};


export default {
  followController,
};
