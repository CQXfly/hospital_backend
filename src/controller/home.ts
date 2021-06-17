import { Controller, Get, Provide } from '@midwayjs/decorator';

@Provide()
@Controller('/')
export class HomeController {

  @Get('/home')
  async home() {
    return 'Hello Midwayjs!';
  }
}
