import { Inject, Controller, Provide,Post,Get, Body, Query } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IResponse, response } from '../common/helper';
// import { Redis } from 'ioredis'
import { UserService } from '../service/user';

@Provide()
@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;

  // @Plugin()
  // redis: Redis;

  @Inject()
  uerService: UserService;

  @Post('/login')
  async login(@Body() wxid: string): Promise<IResponse> {

    try {
      const result = await this.uerService.login(wxid)
      return response(result)
    } catch (error) {
      return response({}, error.message, 400)
    }
  }

  @Post('/update/patient')
  async patientInfoUpdate() {

  }

  @Post('/update/doctor')
  async doctorInfoUpdate() {
    
  }

  @Post('/register/patient')
  async reigsterPatient(
    @Body() wxid: string, 
    @Body() age: number,
    @Body() name: string,
    @Body() address?: string,
    @Body() contact?: string,
    @Body() gender?: boolean ): Promise<IResponse> {

    try {
      const result = await this.uerService.reigsterPatient(wxid, age, name, address, contact, gender)
      return response(result)
    } catch (error) {
       return  response({}, error.message, 400)
    }
  }

  @Post('/register/doctor')
  async registerDoctor(
    @Body() wxid: string, 
    @Body() name: string,
    @Body() contact?: string,
    @Body() jobNumber?: string): Promise<IResponse> {

    try {
      const result = await this.uerService.reigsterDoctor(wxid, name, contact, jobNumber)
      return response(result)
    } catch (error) {
       return  response({}, error.message, 400)
    }
  }

  @Get('/getOpenid')
  async openId(
    @Query() code: string
  ) {
    
    const result =  await this.ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${this.ctx.app.config.wxconfig.appId}&secret=${this.ctx.app.config.wxconfig.secret}&js_code=${code}&grant_type=authorization_code&connect_redirect=1`, {
      dataType: 'json'
    })

    // "data": {
  //     "errcode": 40163,
  //     "errmsg": "code been used, hints: [ req_id: bEOCBK4FE-3EaLYa ]"
  // },
//   "data": {
//     "session_key": "cHWSqp2SOBb/cXd0r7RIXw==",
//     "openid": "oS_Ml5l_sFXgj_SX5tlr59T21d3g"
// },
    if (result.data.errorcode != undefined) {
      return response(result.data, result.data.errmsg, 400)
    }
    return response(result.data)
  }
}
