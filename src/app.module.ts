import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './orm.config';
import configuration from 'config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration], // 추후에 개발과 운영으로 나누어야함
    }),
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
