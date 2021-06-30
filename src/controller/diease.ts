import { Inject, Controller, Post, Provide, Body } from '@midwayjs/decorator';
import { Context } from 'egg';
// import { IResponse, response } from '../common/helper';
// import { IGetUserResponse } from '../interface';
import { DieaseService } from '../service/diease';

@Provide()
@Controller('/diease')
export class DieaseController {
  @Inject()
  ctx: Context;


  @Inject()
  dieaseService: DieaseService;

  @Post('/uploadPhoto')
  async uploadPhoto(@Body() photos: string[]) {

  }

  @Post('updateInfo')
  async updateInfo(@Body() type: string,@Body() info: string,@Body() stage: string,@Body() patientid: string) {
      
  }

}
