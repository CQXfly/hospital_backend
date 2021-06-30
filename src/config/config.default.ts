import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { ConnectionOptions } from 'typeorm';

interface WXIDConfig {
  appId: string
  secret: string
}
declare module 'egg' {
  interface EggAppConfig {
    wxconfig: WXIDConfig;
  }
}

export type DefaultConfig = PowerPartial<EggAppConfig>;
export const security = {
  csrf: false,
};
export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1620391378480_9304';

  // add your config here
  config.middleware = [];

  config.security = security

  // config.security = {
  //   domainWhiteList: [ 'http://localhost:7001' ],
  //   csrf: {
  //     headerName: '_csrf'
  //   },
  // }

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  config.orm = {
    type: 'mysql',
    port: 3306,
    username: 'huangwei',
    password: '758214335Hw' || '',
    database: 'hospital',
    synchronize: false,
    logging: true,
    timezone: '+08:00',
    host: '118.24.101.213',
  } as ConnectionOptions;

  config.wxconfig = {
    appId: 'wx103bce8601a12944',
    secret: '3f6b345006f620c855a030dc4872d363'
  }

  // config.orm = {
  //   type: 'mysql',
  //   host: '',
  //   port: 3306,
  //   username: 'fox',  //root， Fox_123456
  //   password: 'Fox-123456',
  //   database: 'foxTest',
  //   synchronize: false,
  //   logging: false,
  //   timezone: '+08:00',
  // };
  
  // config.redis = {
  //   client: {
  //     port: 6379,
  //     host: 'localhost',
  //     password: '',
  //     db: null,
  //   },
  // };

  return config;
};
