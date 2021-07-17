// import * as assert from 'assert';

// import { Provide } from "@midwayjs/decorator";
import { Context } from 'egg';
// import { IWebMiddleware, IMidwayWebNext, MidwayWebMiddleware } from "@midwayjs/web";
import { IMidwayWebNext } from "@midwayjs/web";

// @Provide()
// export class JwtAuthHandlerMiddleware implements IWebMiddleware {
//     resolve(): MidwayWebMiddleware {
//         return jwtAuth
//     }
// }
export default () =>{
 return async (ctx: Context, next: IMidwayWebNext): Promise<void> => {
    console.log('auth')
    if (ctx.header.authorization) {
      const [, token] = ctx.header.authorization.split(' ');
      // let token = ctx.header.authorization
      // 解密，获取payload

      try {
        const { payload } = ctx.app.jwt.decode<{ wxid: string }>(token);

        console.log(payload)
        await next();
      } catch (error) {
        ctx.status = 405
        await next();
      }
      
      // const { jwtAuth } = ctx.app.config;

    //   // redisToken不存在表示token已过期
    //   const redisToken = await ctx.app.redis.get(
    //     `${jwtAuth.redisScope}:accessToken:${payload.id}`
    //   );

      // 验证是否为最新的token
    //   assert(token === redisToken, new MyError('Authentication Failed', 401));

    //   const userinfo = await ctx.app.redis.get(
    //     `${jwtAuth.redisScope}:userinfo:${payload.id}`
    //   );

    }
  };

};
