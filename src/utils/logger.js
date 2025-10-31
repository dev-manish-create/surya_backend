import { createLogger, transports, format } from 'winston';
const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.simple()),
  transports: [new transports.Console(), new transports.File({ filename: 'logs/error.log', level: 'error' })],
});
logger.stream = { write: (message) => logger.info(message.trim()) };
export default logger;
