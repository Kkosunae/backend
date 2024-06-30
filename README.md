# 꼬순내 KKOSUNAE
- 위치기반 SNS를 이용한 반려동물 산책 앱
- 앱 안에 사람은 없다! 모든건 동물이 기준
- 최종 목표 → 반려동물 전생애주기 관리

<img style="width:600px" src="https://github.com/Kkosunae/backend/assets/48286887/da3ab729-1ee0-4b1d-9521-4f755cf3123c">

## BE
Node, ProgreSQL, GIthub Action, Docker

## Crawling
Python, Beautifulsoup
<img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=Github Actions&logoColor=white">

[Node](https://github.com/nodejs/node) 를 활용한 kkosunae backend repository입니다.

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
