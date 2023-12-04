import multer from 'multer';
import multerS3 from 'multer-s3';
import {s3} from '../src/services/aws.js';
import config from 'config';
import moment from 'moment';

const footprintFileFilter = (req, file, cb) => {
  const {content} = req.body;
  if (content.length > 500) {
    cb(new Error('게시글은 500자를 초과할 수 없습니다.'), false);
  } else {
    cb(null, true);
  }
};

const footprintUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.get('s3.bucket'),
    acl: 'public-read',
    limits: {fileSize: 20 * 1024 * 1024}, // 최대 20MB 파일
    key: function(req, file, cb) {
      if (!req.userId) {
        return cb(new Error('Unauthorized'), null);
      }

      req.fileCount = req.fileCount || 0;
      const formattedDate = moment().format('YYYY/MM/DD');
      const formattedTime = moment().format('YYMMDDHHmmss');
      const count = ++req.fileCount;
      const fileName = `${formattedTime}_${req.userId}_${count}_${file.originalname}`;

      const filePath = `images/footprint/${formattedDate}/${fileName}`;
      cb(null, filePath);
    },
  }),
  fileFilter: footprintFileFilter,
});


const communityPostFileFilter = (req, file, cb) => {
  const {content} = req.body;
  if (content.length > 1000) {
    cb(new Error('게시글은 1000자를 초과할 수 없습니다.'), false);
  } else {
    cb(null, true);
  }
};

const communityPostUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.get('s3.bucket'),
    acl: 'public-read',
    limits: {fileSize: 20 * 1024 * 1024}, // 최대 20MB 파일
    key: function(req, file, cb) {
      if (!req.userId) {
        return cb(new Error('Unauthorized'), null);
      }

      req.fileCount = req.fileCount || 0;
      const formattedDate = moment().format('YYYY/MM/DD');
      const formattedTime = moment().format('YYMMDDHHmmss');
      const count = ++req.fileCount;
      const fileName = `${formattedTime}_${req.userId}_${count}_${file.originalname}`;

      const filePath = `images/community/${formattedDate}/${fileName}`;
      cb(null, filePath);
    },
  }),
  fileFilter: communityPostFileFilter,
});


export {footprintUpload, communityPostUpload};
