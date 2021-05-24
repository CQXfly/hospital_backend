import { Inject, Controller, Post, Provide, Query,Get, Plugin } from '@midwayjs/decorator';
import { Context } from 'egg';
import { Redis } from 'ioredis'
import { IGetUserResponse } from '../interface';
import { UserService } from '../service/user';

@Provide()
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Plugin()
  redis: Redis;

  @Inject()
  userService: UserService;

  @Get('/user')
  async user(@Query() uid: string): Promise<IGetUserResponse> {
    
    // this.redis.get("fox1", (err, res) => {
    //   console.log(res)
    //   // this.ctx.logger.debug(res)
    // })
    await this.userService.fuck2("23")
    this.redis.set("fox123", "456", (err, res)=> {
      console.log(res)
    })
    return { success: true, message: 'OK', data: {uid: "123"} };    
  }

  @Post('/get_user')
  async getUser(@Query() uid: string): Promise<any> {
    this.redis.get("123", (err, res) => {
      this.ctx.logger.debug(res)
    })
    // const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: {} };
  }
}
