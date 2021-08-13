import { Inject, Controller, Post, Provide, Body, Get, Query } from '@midwayjs/decorator';
import { Context } from 'egg';
import { response } from '../common/helper';
import { DiseaseService } from '../service/disease'

@Provide()
@Controller('/disease')
export class DiseaseController {
  @Inject()
  ctx: Context;


  @Inject()
  diseaseService: DiseaseService;

  @Post('/uploadPhoto')
  async uploadPhoto(
    @Body() photos: string[], 
    @Body() diseaseId: string
    ) {
      try {
        await this.diseaseService.updatePhotos(photos, diseaseId)
        return response({})
      } catch (error) {
        return response({}, error.message, 404)
      }
  }

  @Get('/getdiseases')
  async getDiseases(@Query() patientId: string){
    
    try {
      let diseases = await this.diseaseService.getDiseases(patientId)
      return response(diseases)
    } catch (error) {
      return response({}, error.message, 404)
    }
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
      let r = await this.diseaseService.updateDiease(patientId, dieaseId, doctorId, info, stage, type)
      return response(r)
  }
}
