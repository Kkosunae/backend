# 꼬순내 KKOSUNAE
- 위치기반 SNS를 이용한 반려동물 산책 앱
- 앱 안에 사람은 없다! 모든건 동물이 기준
- 최종 목표 → 반려동물 전생애주기 관리

<img style="width:600px" src="https://github.com/Kkosunae/backend/assets/48286887/da3ab729-1ee0-4b1d-9521-4f755cf3123c">

## BE
Node, ProgreSQL, GIthub Action, Docker, AWS EC2, RDS, S3

## Crawling
Python, Beautifulsoup

## Features
    1. JWT를 활용한 로그인, 회원가입
    2. Kakao, Apple, Google 소셜 로그인 구현
    3. 산책 시작, 종료 기능
    3-1. n 시간 후 산책 자동 종료 배치 적용
    4. 산책 스토리 게시물 CRUD
    5. 팔로잉, 언팔로잉 기능
    6. 추천 기능
    7. 커뮤니티 게시물 CRUD

## Communication
- 문서 : 노션
- Task 관리 : Jira
- 회의 :Discord

## Convention

### DB 컨벤션
    - 테이블, 컬럼 모두 snake
    - 숫자, 약어 사용하지 않기
    - 외래키는 뒤에 _id
    - 참고 : https://blex.me/@Su-per/mysql-네이밍-컨벤션-정리
    
### 브랜치 컨벤션
<img width="500px" alt="스크린샷 2023-06-05 오후 9 04 44" src="https://github.com/Kkosunae/backend/assets/48286887/824a26b7-315d-418f-bc0d-02062811748f">

### 커밋 컨벤션
<img width="500px" alt="스크린샷 2023-06-05 오후 9 39 40" src="https://github.com/Kkosunae/backend/assets/48286887/ef34ad52-15ee-4293-87c3-babdd7e76456">


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm start
$ pm2 start npm -- start
```
