'use strict';

import User from './user.js';
import SocialLogin from './socialLogin.js';
import Follow from './follow.js';
import FollowHistory from './followHistory.js';
import Footprint from './footprint.js';
import FootprintImage from './footprintImage.js';
import FootprintComment from './footprintComment.js';

import Map from './map.js';
import Walk from './walk.js';
import Community from './community.js';
import CommunityImage from './communityImage.js';
import CommunityComment from './communityComment.js';

const models = {
  User,
  SocialLogin,
  Follow,
  FollowHistory,
  Footprint,
  FootprintImage,
  FootprintComment,
  Map,
  Walk,
  Community,
  CommunityImage,
  CommunityComment,
};

SocialLogin.belongsTo(User, {foreignKey: 'user_id', as: 'user'});
User.hasOne(SocialLogin, {foreignKey: 'user_id', as: 'socialLogin'});

Follow.belongsTo(User, {foreignKey: 'follower_id', as: 'follower'});
Follow.belongsTo(User, {foreignKey: 'following_id', as: 'following'});
User.hasMany(Follow, {foreignKey: 'follower_id', as: 'followerUser'});
User.hasMany(Follow, {foreignKey: 'following_id', as: 'followingUser'});

FollowHistory.belongsTo(User, {foreignKey: 'follower_id', as: 'follower'});
FollowHistory.belongsTo(User, {foreignKey: 'following_id', as: 'following'});
FollowHistory.belongsTo(Follow, {foreignKey: 'follow_id', as: 'follow', constraints: false});
User.hasMany(FollowHistory, {foreignKey: 'follower_id', as: 'follower'});
User.hasMany(FollowHistory, {foreignKey: 'following_id', as: 'following'});
Follow.hasMany(FollowHistory, {foreignKey: 'follow_id', as: 'follow'});

Footprint.belongsTo(User, {foreignKey: 'user_id', as: 'user'});
User.hasMany(Footprint, {foreignKey: 'user_id', as: 'footprint'});

FootprintImage.belongsTo(Footprint, {foreignKey: 'footprint_id', as: 'footprint'});
Footprint.hasMany(FootprintImage, {foreignKey: 'footprint_id', as: 'footprintImage'});

FootprintComment.belongsTo(Footprint, {foreignKey: 'footprint_id', as: 'footprint'});
Footprint.hasMany(FootprintComment, {foreignKey: 'footprint_id', as: 'footprintComment'});

FootprintComment.belongsTo(User, {foreignKey: 'user_id', as: 'user'});
User.hasMany(FootprintComment, {foreignKey: 'user_id', as: 'footprintComment'});

Walk.belongsTo(User, {foreignKey: 'user_id', as: 'user'});
User.hasMany(Walk, {foreignKey: 'user_id', as: 'walk'});

Community.belongsTo(User, {foreignKey: 'user_id', as: 'user'});
User.hasMany(Community, {foreignKey: 'user_id', as: 'community'});

CommunityImage.belongsTo(Community, {foreignKey: 'community_id', as: 'community'});
Community.hasMany(CommunityImage, {foreignKey: 'community_id', as: 'communityImage'});

CommunityComment.belongsTo(Community, {foreignKey: 'community_id', as: 'community'});
Community.hasMany(CommunityComment, {foreignKey: 'community_id', as: 'communityComment'});

CommunityComment.belongsTo(User, {foreignKey: 'user_id', as: 'user'});
User.hasMany(CommunityComment, {foreignKey: 'user_id', as: 'communityComment'});

export {models};

