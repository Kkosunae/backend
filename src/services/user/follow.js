import {models} from '../../models/index.js';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import config from 'config';
import {Op} from 'sequelize';
import c from 'config';

const {Follow, FollowHistory} = models;

export const followService = {
  // 존재하는 팔로우인지 확인
  isExistingFollow: async (followerId, followingId) => {
    const follow = await Follow.findOne({where: {
      follower_id: followerId,
      following_id: followingId,
    }});
    if (follow) {
      return true;
    }
    return false;
  },
  getFollowingList: async (userId) => {
    try {
      const followList = await Follow.findAll({
        where: {
          follower_id: userId,
        },
        attributes: ['id', 'following_id'],
      });
      return followList;
    } catch (error) {
      throw new Error('Failed to get follow list.');
    }
  },
  getFollowerList: async (userId) => {
    try {
      const followList = await Follow.findAll({
        where: {
          following_id: userId,
        },
        attributes: ['id', 'follower_id'],
      });
      return followList;
    } catch (error) {
      throw new Error('Failed to get follow list.');
    }
  },
  follow: async (followerId, followingId) => {
    try {
      const follow = await Follow.create({
        follower_id: followerId,
        following_id: followingId,
      });
      await FollowHistory.create({
        follow_id: follow.id,
        follower_id: followerId,
        following_id: followingId,
        action: 'follow',
      });
    } catch (error) {
      throw new Error('Failed to follow the user.');
    }
  },
  unfollow: async (followerId, followingId) => {
    try {
      const follow = await Follow.findOne(
          {where: {follower_id: followerId, following_id: followingId}},
      );
      await FollowHistory.create({
        follow_id: follow.id,
        follower_id: followerId,
        following_id: followingId,
        action: 'unfollow',
      });
      await Follow.destroy({where: {
        follower_id: followerId,
        following_id: followingId,
      }});
    } catch (error) {
      throw new Error('Failed to unfollow the user.');
    }
  },
};

export default followService;
