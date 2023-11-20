# 기본 이미지로 Node.js 환경 설정
FROM node:18

# 작업 디렉토리 생성
WORKDIR /app

# 소스 코드 복사
COPY . .

# PM2 설치
RUN npm install pm2 -g

# 앱 의존성 설치
RUN npm install

# PM2로 애플리케이션 실행 (app.js 대신 실제 애플리케이션 파일 이름을 사용하세요)
CMD ["pm2-runtime", "npm", "--", "start"]
