import crypto from 'crypto';

// 32바이트(256비트) 길이의 랜덤한 시크릿 키 생성
const secretKey = crypto.randomBytes(32).toString('base64');
console.log('Secret Key:', secretKey);
