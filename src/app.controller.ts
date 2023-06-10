import {
  Body,
  Controller,
  Get,
  Post,
  Response,
  Request,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/kakao-login')
  async login(@Body() body: any, @Response() res): Promise<any> {
    try {
      // 카카오 토큰 조회 후 계정 정보 가져오기
      const { code, domain } = body;
      if (!code || !domain) {
        throw new BadRequestException('카카오 정보가 없습니다.');
      }
      const kakao = await this.appService.kakaoLogin({ code, domain });

      console.log(`kakaoUserInfo : ${JSON.stringify(kakao)}`);
      if (!kakao.id) {
        throw new BadRequestException('카카오 정보가 없습니다.');
      }

      res.send({
        user: kakao,
        message: 'success',
      });
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }
}
