import { Inject, Controller, Post, Provide, Body } from '@midwayjs/decorator';
import { Context } from 'egg';
import { response } from '../common/helper';
import { DieaseService } from '../service/diease';

@Provide()
@Controller('/diease')
export class DieaseController {
  @Inject()
  ctx: Context;


  @Inject()
  dieaseService: DieaseService;

  @Post('/uploadPhoto')
  async uploadPhoto(
    @Body() photos: string[], 
    @Body() dieaseId: string
    ) {
    await this.dieaseService.updatePhotos(photos, dieaseId)
    return response({})
  }

  @Post('/updateInfo')
  async updateInfo(
    @Body() type: string,
    @Body() info: string,
    @Body() stage: string,
    @Body() patientId: string, 
    @Body() dieaseId?: string, 
    @Body() doctorId?: string
    ) {
      await this.dieaseService.updateDiease(patientId, dieaseId, doctorId, info, stage, type)
      return response({})
  }
}
