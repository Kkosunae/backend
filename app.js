import app from './loaders/express.js';
import router from './src/routes/index.js';
import { config, passport, yaml, swaggerUI, sequelize } from './loaders/module.js';

const openAPIDocument = yaml.load('./api/openapi.yaml');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openAPIDocument));
app.use('/', router);

app.listen(config.get('server.port'));


// DB 연결
// alter: true -> 기존데이터 유지하며, 테이블 업데이트
sequelize
    .sync({ force: true })
    .then(() => {
        // logger.info('Success Connecting DB!');
    })
    .catch((err) => {
        console.error(err);
    });