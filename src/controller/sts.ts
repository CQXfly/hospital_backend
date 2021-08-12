import { Inject, Controller, Provide,Get } from '@midwayjs/decorator';
import { Context } from 'egg';
import { response } from '../common/helper';


@Provide()
@Controller('/sts')
export class StsController {
  @Inject()
  ctx: Context;

  @Get("/sts")
  async sts() {
    let result = await this.ctx.app.cossts.getCredential()
    return response(result) 
  }
}
