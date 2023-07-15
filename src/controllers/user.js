'use strict';

import express from 'express';
import { signInKakao } from '../services/user.js';

const loginKakao = async (req, res) => {
    try {
      const headers = req.headers["authorization"];
      const kakaoToken = headers.split(" ")[1];
  
      const accessToken = await signInKakao(kakaoToken);
  
      return res.status(200).json({ accessToken });
    } catch (error) {
      // Handle error
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
};

export default {
    loginKakao
}