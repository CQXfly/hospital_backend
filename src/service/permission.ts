import { Provide } from '@midwayjs/decorator'
import { InjectEntityModel } from '@midwayjs/orm';
import { PermissionModel } from '../model/permission'
import { Repository } from 'typeorm';

@Provide()
export class PermissionService {

    @InjectEntityModel(PermissionModel)
    permissionModel: Repository<PermissionModel>;

    async updateLesson(lessonid?: string) {

    }
}