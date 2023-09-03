import AWS from 'aws-sdk';
import config from 'config';
import multerS3 from 'multer-s3';


const s3 = new AWS.S3({
  accessKeyId: config.get('s3.access_key'),
  secretAccessKey: config.get('s3.access_secret_key'),
});

const upload = multerS3({
  s3: s3,
  bucket: config.get('s3.bucket'),
  acl: 'public-read',
  limits: {fileSize: 20 * 1024 * 1024},
});

const uploadImages = (images) => {
  const imageUrls = images.map((image) => image.location);
  return imageUrls;
};

export {
  s3,
  upload,
  uploadImages,
};
