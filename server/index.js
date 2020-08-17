require('dotenv').config({silent: process.env.NODE_ENV === 'production'});
const express = require('express');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
//! Services
const logger = require('./services/logger');

const app = express();
// Helmet setup
app.use(helmet());

// Rate limit setup, this will help in minimizing DOS attacks
const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit number of requests per IP
  delayMs: 0, //
});
app.use(limiter);

app.use(cors());
app.use(bodyParser.json());

//! DB and Services
require('./models/db');
require('./services/cache');

//! Swagger
const swaggerSpec = swaggerJSDoc(swaggerDoc);
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//! Routes
const {profiles} = require('./routes');
app.use('/api', profiles);

const PORT = process.env.SERVER_PORT || 4040;
app.listen(PORT, () => {
  logger.info('Phone Book API Listening on Port: ' + PORT);
});
