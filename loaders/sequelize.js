'use strict';

import Sequelize from 'sequelize';
import config from 'config';

import User from "../src/models/user.js";
import SocialLogin from "../src/models/socialLogin.js";
import Follow from "../src/models/follow.js";
import FollowHistory from "../src/models/followHistory.js";
import Footprint from "../src/models/footprint.js";
import FootprintImage from "../src/models/footprintImage.js";
import FootprintComment from "../src/models/footprintComment.js";

import Map from "../src/models/map.js";
import MapComplain from "../src/models/mapComplain.js";
import MapReportNew from "../src/models/mapReportNew.js";
import Walk from "../src/models/walk.js";
import Community from "../src/models/community.js";
import CommunityImage from "../src/models/communityImage.js";
import CommunityComment from "../src/models/communityComment.js";

const sequelize = new Sequelize(
  config.get("postgres.database"),
  config.get("postgres.username"),
  config.get("postgres.password"),
  {
    host: config.get("postgres.host"),
    dialect: config.get("postgres.dialect"),
    timezone: config.get("postgres.timezone"), // 예시: 대한민국 시간대에 맞는 옵션 설정
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

const db = {};

db.sequelize = sequelize;

db.User = User;
db.SocialLogin = SocialLogin;
db.Follow = Follow;
db.FollowHistory = FollowHistory;
db.Footprint = Footprint;
db.FootprintImage = FootprintImage;
db.FootprintComment = FootprintComment;

db.Map = Map;
db.MapComplain = MapComplain;
db.MapReportNew = MapReportNew;
db.Walk = Walk;
db.Community = Community;
db.CommunityImage = CommunityImage;
db.CommunityComment = CommunityComment;

User.init(sequelize);
SocialLogin.init(sequelize);
Follow.init(sequelize);
FollowHistory.init(sequelize);
Footprint.init(sequelize);
FootprintImage.init(sequelize);
FootprintComment.init(sequelize);

Map.init(sequelize);
MapComplain.init(sequelize);
MapReportNew.init(sequelize);
Walk.init(sequelize);
Community.init(sequelize);
CommunityImage.init(sequelize);
CommunityComment.init(sequelize);

User.associate(db);
SocialLogin.associate(db);
Follow.associate(db);
FollowHistory.associate(db);
Footprint.associate(db);
FootprintImage.associate(db);
FootprintComment.associate(db);

Map.associate(db);
MapComplain.associate(db);
MapReportNew.associate(db);
Walk.associate(db);
Community.associate(db);
CommunityImage.associate(db);
CommunityComment.associate(db);

export default db;
