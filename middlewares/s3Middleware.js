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
      console.log(req.userId);
      if (!req.userId) {
        return res.status(401).json({error: 'Unauthorized'});
      }

      req.fileCount = req.fileCount || 0;
      const formattedDate = moment().format('YYYY/MM/DD');
      const formattedTime = moment().format('YYMMDDHHmmss');
      const fileName = `${formattedTime}_${req.userId}_${file.originalname}`;
      const count = ++req.fileCount;

      // 카운트가 1 이상일 때만 카운트를 파일명에 추가
      const finalFileName = count > 1 ? `${fileName}_${count}` : `${fileName}_1`;
      const filePath = `post/${formattedDate}/${finalFileName}`;
      cb(null, filePath);
    },
  }),
});

export default upload;
