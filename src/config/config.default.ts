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
      '/user/getOpenid',
      '/sts/sts',
      '/home'
    ]
  }

  config.jwtAuth = {
    ignore: config.jwt.ignore,
    redisScope: 'user',
    accessTokenExpiresIn: 60 * 60 * 24 * 30
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
    appId: 'wx31327e7be6fcf2f0',
    secret: '659c6b30f15d9acd35faa8a43c9ff065'
  }

  config.cossts = {
    secretId: 'AKIDmOmumSs2zh9LGvJQHrAD0WliPownOilY',   // 固定密钥
    secretKey: 'YuznKbbKp31i9JDrFNGsDH5duvf8KApE',  // 固定密钥
    proxy: '',
    host: 'sts.tencentcloudapi.com', // 域名，非必须，默认为 sts.tencentcloudapi.com
    durationSeconds: 1800,  // 密钥有效期
    // 放行判断相关参数
    bucket: 'hospital-1253113581', // 换成你的 bucket
    region: 'ap-shanghai', // 换成 bucket 所在地区
    allowPrefix: '*' // 这里改成允许的路径前缀，可以根据自己网站的用户登录态判断允许上传的具体路径，例子： a.jpg 或者 a/* 或者 * (使用通配符*存在重大安全风险, 请谨慎评估使用)
};

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

