import { Inject, Controller, Post, Provide, Query,Get, Body } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IResponse, response } from '../common/helper';
import { IGetUserResponse } from '../interface';
import { ClockInService } from '../service/clockIn';

@Provide()
@Controller('/clockin')
export class ClockInController {
  @Inject()
  ctx: Context;


  @Inject()
  clockInService: ClockInService;

  @Get('/user')
  async user(@Query() uid: string): Promise<IGetUserResponse> {
    
    // this.redis.get("fox1", (err, res) => {
    //   console.log(res)
    //   // this.ctx.logger.debug(res)
    // })
    // await this.userService.fuck2("23")

    return { success: true, message: 'OK', data: {uid: "123"} };    
  }

  @Post('/update')
  async getUser(
    @Body() uid: string, 
    @Body() date: string,
    @Body()  duration: number,
    @Body() lessonid: string
   ): Promise<IResponse> {

    // const user = await this.userService.getUser({ uid });
    const r = await this.clockInService.clockIn(uid, duration, lessonid, date)

    return response(r)
  }
}
