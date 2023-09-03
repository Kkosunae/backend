import multer from 'multer';
import multerS3 from 'multer-s3';
import {s3} from '../src/services/aws.js';
import config from 'config';
import moment from 'moment';

const upload = multer({
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

      const filePath = `images/post/${formattedDate}/${fileName}`;
      cb(null, filePath);
    },
  }),
});

export default upload;
