import { EggPlugin } from 'egg';
export default {
  logrotator: false, // disable when use @midwayjs/logger
  static: true,
  mysql: {
    enable: true,
    package: 'egg-mysql'
  },
  redis: {
    enable: true,
    package: 'egg-redis'
  }
} as EggPlugin;
