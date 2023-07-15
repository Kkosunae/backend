import app from './loaders/express.js';
import router from './src/routes/index.js';
import { config, passport } from './loaders/module.js';

app.use('/', router);

app.listen(config.get('server.port'));

