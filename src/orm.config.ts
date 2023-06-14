import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    // syncronize가 true면 db와 entity 대조하여 싱크 맞춤
    SYNCRONIZE: false,
    // domain 디렉터리 하위에 있는 entity 참조
    ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
    MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
    MIGRATIONS_RUN: false,
  };

  return {
    name: 'default',
    type: 'mysql',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    logging: true,
    synchronize: commonConf.SYNCRONIZE,
    entities: commonConf.ENTITIES,
    migrations: commonConf.MIGRATIONS,
    migrationsRun: commonConf.MIGRATIONS_RUN,
  };
}

export { ormConfig };