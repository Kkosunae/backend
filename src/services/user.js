import User from "../models/index.js";
import axios from "axios";
import jwt from "jsonwebtoken";

export const signInKakao = async (kakaoToken) => {
    const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
            Authorization: `Bearer ${kakaoToken}`,
        },
    });
    const {data} = result
    console.log(data)

    // const name = data.properties.nickname;
    // const email = data.kakao_account.email;
    // const kakaoId = data.id;
    // const profileImage = data.properties.profile_image;

    // if (!name || !email || !kakaoId) throw new error("KEY_ERROR", 400);

    // const user = await userDao.getUserById(kakaoId);

    // if (!user) {
    //     await userDao.signUp(email, name, kakaoId, profileImage);
    // }

    // return jwt.sign({ kakao_id: user[0].kakao_id }, process.env.TOKKENSECRET);
    return 'good';
    
};
