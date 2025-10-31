import compression from 'compression';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import errorHandler from '../middlewares/errorHandler.js';
import routes from '../routes/index.js';
import { connectDB } from '../utils/db.js';
import logger from '../utils/logger.js';

const app = express();
connectDB();

app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: logger.stream }));

const limiter = rateLimit({ windowMs: 15*60*1000, max: 200 });
app.use('/api/', limiter);

app.use('/api', routes);

app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date() }));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

export default app;
