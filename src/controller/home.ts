import { Controller, Get, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { AdminMenuModel } from '../model/admin-menu'
import { Repository } from 'typeorm';

@Provide()
@Controller('/')
export class HomeController {
  @InjectEntityModel(AdminMenuModel)
  adminMenuModel: Repository<AdminMenuModel>;

  async saveAdmin() {
    
    // create a entity object
    let admin = new AdminMenuModel
    admin.parentId = "123"
    admin.permissionId = "23"
    admin.order = 32
    
    // save entity
    
    try {
      const re = await this.adminMenuModel.save(admin)
      console.log(re)
    } catch (error) {
      console.log(error);
    }
    
    // save success
    console.log('admin id = ', admin.id);

  }

  @Get('/home')
  async home() {
    this.saveAdmin()
    return 'Hello Midwayjs!';
  }
}
