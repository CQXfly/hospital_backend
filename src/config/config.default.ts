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
  config.middleware = ['jwtAuth'];
  
  config.jwt = {
    enable: true,
    client: {
      secret: 'dashakewhasadnkasnk'
    },
    ignore: [
      '/user/login', 
      '/user/register/doctor', 
      '/user/register/patient', 
      '/user/getOpenid'
    ]
  }

  config.jwtAuth = {
    ignore: config.jwt.ignore,
    redisScope: 'user',
    accessTokenExpiresIn: 60 * 60 * 24 * 3
  }

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
    appId: 'wxb72baa7d4b418f61',
    secret: '57796d22db02c077e2f741f3472b0820'
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

