import app from './loaders/express.js';
import router from './src/routes/index.js';
import { config, passport, yaml, swaggerUI } from './loaders/module.js';

const openAPIDocument = yaml.load('./api/openapi.yaml');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openAPIDocument));
app.use('/', router);

app.listen(config.get('server.port'));

