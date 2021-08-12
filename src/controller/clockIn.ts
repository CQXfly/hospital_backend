import { Inject, Controller, Post, Provide, Query,Get, Body } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IResponse, response } from '../common/helper';
import { ClockInService } from '../service/clockIn';

@Provide()
@Controller('/clockin')
export class ClockInController {
  @Inject()
  ctx: Context;


  @Inject()
  clockInService: ClockInService;

  @Get('/record')
  async record(
    @Query() uid: string, 
    @Query() startDate: string,
    @Query() endDate: string
   ): Promise<IResponse> {

    // const user = await this.userService.getUser({ uid });
    const r = await this.clockInService.getUserCheckInRecord(uid, startDate, endDate)

    return response(r)
    
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
