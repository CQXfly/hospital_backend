import { Inject, Controller, Provide,Post,Get, Body, Query } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IResponse, response } from '../common/helper';
import { DiseaseService } from '../service/disease';
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

  @Inject()
  diseaseService: DiseaseService;

  @Post('/login')
  async login(@Body() wxid: string): Promise<IResponse> {

    try {
      const result = await this.uerService.login(wxid)
      const token = await this.uerService.createUserToken(wxid)
      return response({...result, token})
    } catch (error) {
      return response({}, error.message, 400)
    }
  }

  @Post('/update/patient')
  async patientInfoUpdate(
    @Body() wxid: string, 
    @Body() age?: number,
    @Body() name?: string,
    @Body() address?: string,
    @Body() contact?: string,
    @Body() gender?: boolean
    ) {
      try {
        let rr = await this.uerService.updatePatient(wxid, age, name, address, contact, gender)
        return response(rr, 'update success', 200)
      } catch (error) {
         return  response({}, error.message, 400)
      }
  }    

  @Post('/update/doctor')
  async doctorInfoUpdate(
    @Body() wxid: string, 
    @Body() name?: string,
    @Body() contact?: string,
    @Body() jobNumber?: string
  ) {
    try {
      let rr = await this.uerService.updateDoctor(wxid, name, contact, jobNumber)
      return response(rr, 'update success', 200)
    } catch (error) {
       return  response({}, error.message, 400)
    }
  }

  @Post('/doctors')
  async doctors(@Body() doctorids: string[] ){
      try {
        let r = await this.uerService.findDoctors(doctorids)
        return response(r)
      } catch (error) {
         return  response({}, error.message, 400)
      }
  }

  @Post('/patients')
  async patients(@Body() patientids: string[] ){
    try {
      let r = await this.uerService.findPatients(patientids)
      return response(r)
    } catch (error) {
       return  response({}, error.message, 400)
    }
  }

  @Post('/bindDoctor')
  async patientBindDoctor(@Body() patientid: string,@Body() doctorid: string) {
    try {
      let r = await this.uerService.bindPatient(patientid, doctorid)
      return response(r)
    } catch (error) {
       return  response({}, error.message, 400)
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
      await this.uerService.reigsterPatient(wxid, age, name, address, contact, gender)
      const token = await this.uerService.createUserToken(wxid)
      return response({token}, "register success", 200)
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
      await this.uerService.reigsterDoctor(wxid, name, contact, jobNumber)
      const token = await this.uerService.createUserToken(wxid)
      return response({token}, "register success", 200)
    } catch (error) {
       return  response({}, error.message, 400)
    }
  }

  @Post('/doctor/patients')
  async findPatientsGroupByDoctor(@Body() doctorId: string ){
    try {
      let r = await this.uerService.findAllPatientsByDoctor(doctorId)
      return response(r)
    } catch (error) {
       return  response({}, error.message, 400)
    }
  }

  @Post('/patient/doctors')
  async findDoctorsGroupByOatient(@Body() patientId: string ){
    try {
      let [r1, r2 ] = await Promise.all([
        this.uerService.findDoctorByPatientId(patientId),
        this.diseaseService.doctorsByPatient(patientId)]
      )
      
      let doctorIds = r2.map(item => {return item.doctor_id})
      doctorIds.push(r1)

      let result = await this.uerService.findDoctors(doctorIds)
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
