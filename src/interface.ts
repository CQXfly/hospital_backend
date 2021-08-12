import * as STS from 'qcloud-cos-sts'
/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: string;
}

export interface IGetUserResponse {
  success: boolean;
  message: string;
  data: IUserOptions;
}

export interface COSSTSConfig {
    secretId: string,   // 固定密钥
    secretKey: string,  // 固定密钥
    proxy: string,
    host: string, // 域名，非必须，默认为 sts.tencentcloudapi.com
    durationSeconds: number,  // 密钥有效期
    // 放行判断相关参数
    bucket: string, // 换成你的 bucket
    region: string, // 换成 bucket 所在地区
    allowPrefix: string // 这里改成允许的路径前缀，可以根据自己网站的用户登录态判断允许上传的具体路径，例子： a.jpg 或者 a/* 或者 * (使用通配符*存在重大安全风险, 请谨慎评估使用)
}

export class COSSTS {
  config: COSSTSConfig
  constructor(config: COSSTSConfig) {
    this.config = config
  }

  async getCredential() {
    var shortBucketName = this.config.bucket.substr(0 , this.config.bucket.lastIndexOf('-'));
    var appId = this.config.bucket.substr(1 + this.config.bucket.lastIndexOf('-'));
    var policy = {
      'version': '2.0',
      'statement': [{
          'action': [
              // 简单上传
              'name/cos:PutObject',
              'name/cos:PostObject',
              // 分片上传
              'name/cos:InitiateMultipartUpload',
              'name/cos:ListMultipartUploads',
              'name/cos:ListParts',
              'name/cos:UploadPart',
              'name/cos:CompleteMultipartUpload',
          ],
          'effect': 'allow',
          'principal': {'qcs': ['*']},
          'resource': [
              'qcs::cos:' + this.config.region + ':uid/' + appId + ':prefix//' + appId + '/' + shortBucketName + '/' + this.config.allowPrefix,
          ],
      }],
  };
    return await STS.getCredential({
      secretId: this.config.secretId,
      secretKey: this.config.secretKey,
      proxy: this.config.proxy,
      durationSeconds: this.config.durationSeconds,
      policy: policy
    }) 
  }
}

declare module 'egg' {
  interface Application {
    cossts: COSSTS
  }
}