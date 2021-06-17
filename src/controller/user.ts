import { Inject, Controller, Provide,Post, Body } from '@midwayjs/decorator';
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
}
