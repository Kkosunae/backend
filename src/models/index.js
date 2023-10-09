'use strict';

import User from './user.js';
import SocialLogin from './socialLogin.js';
import Follow from './follow.js';
import FollowHistory from './followHistory.js';
import Post from './post.js';
import PostImage from './postImage.js';
import Map from './map.js';
import Walk from './walk.js';

const models = {
  User,
  SocialLogin,
  Follow,
  FollowHistory,
  Post,
  PostImage,
  Map,
  Walk,
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

Post.belongsTo(User, {foreignKey: 'user_id', as: 'user'});
User.hasMany(Post, {foreignKey: 'user_id', as: 'post'});

PostImage.belongsTo(Post, {foreignKey: 'post_id', as: 'post'});
Post.hasMany(PostImage, {foreignKey: 'post_id', as: 'postImage'});

Walk.belongsTo(User, {foreignKey: 'user_id', as: 'user'});
User.hasMany(Walk, {foreignKey: 'user_id', as: 'walk'});

export {models};

