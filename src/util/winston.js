import config from 'config';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const {createLogger, transports, format} = winston;
const {combine, timestamp, colorize, printf, label} = format;

const logDir = 'logs';

// 사용자 지정 포맷
const printFormat = printf(({timestamp, label, level, message}) => {
  return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = {
  default: combine(
      label({
        label: 'RE:SPEC',
      }),
      timestamp({
        format: 'YYYY-MM-DD HH:mm:dd',
      }),
      printFormat,
  ),
};

const logger = createLogger({
  format: printLogFormat.default,
  transports: [
    // info 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
    // warn 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'warn',
      datePattern: 'YYYY-MM-DD',
      dirname: `${logDir}/warn`,
      filename: `%DATE%.warn.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
    // error 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: `${logDir}/error`,
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

// 실제 서비스중인 서버가 아니면
if (config.get('server.state') !== 'production') {
  logger.add(
      new transports.Console({
        format: combine(colorize({all: true}), printFormat),
      }),
  );
}

logger.stream = {
  write: (message) => logger.info(message),
};

export default logger;
