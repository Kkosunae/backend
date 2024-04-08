'use strict';

import sequelize from '../../loaders/sequelize.js';

import User from './user.js';
import SocialLogin from './socialLogin.js';
import Follow from './follow.js';
import FollowHistory from './followHistory.js';
import Footprint from './footprint.js';
import FootprintImage from './footprintImage.js';
import FootprintComment from './footprintComment.js';

import Map from './map.js';
import MapComplain from './mapComplain.js';
import MapReportNew from './mapReportNew.js';
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
  MapComplain,
  MapReportNew,
  Walk,
  Community,
  CommunityImage,
  CommunityComment,
};

export {models};

