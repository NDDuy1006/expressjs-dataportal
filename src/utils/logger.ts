import pino from 'pino';
import pretty from 'pino-pretty';
import dayjs from 'dayjs';

const log = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  },
  base: {
    pid: false
  },
  timestamp: () => `, "time":"${dayjs().format()}"`
});

export default log;