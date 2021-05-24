import { Inject, Controller, Provide, Query,Get, Plugin } from '@midwayjs/decorator';
import { Context } from 'egg';
import { Redis } from 'ioredis'
import { DoctorService } from '../service/doctor';
import { PatientService } from '../service/patient';

@Provide()
@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Plugin()
  redis: Redis;

  @Inject()
  doctorService: DoctorService;

  @Inject()
  patientServicve: PatientService;

  @Get('/register')
  async register(@Query() wxid: string, @Query() type: string ): Promise<{success: boolean , message: string, data: object}> {
    // const user = await this.userService.getUser({ uid });
    // this.redis.get("fox1", (err, res) => {
    //   console.log(res)
    //   // this.ctx.logger.debug(res)
    // })

    let result;
    switch (type) {
        case '"doctor"':
            result = await this.doctorService.reigster(wxid)
            break
        case '"paitient"':
            console.log("paitient")
            result = await this.patientServicve.reigster(wxid)
            break
    }

    return { success: true, message: 'OK', data: result };    
  }
}
