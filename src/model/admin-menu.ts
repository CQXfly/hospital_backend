import { EntityModel } from "@midwayjs/orm"

import {
    Column,
    AfterLoad,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseModel } from './base';

@EntityModel({
    name: 'admin_menu',
})
export class AdminMenuModel extends BaseModel {
    @PrimaryGeneratedColumn({
        type: 'integer',
      })
      id: string;

      @Column({
        type: 'integer',
        name: 'parent_id',
        comment: '父级ID',
      })
      parentId: string;

      @Column({
        type: 'integer',
        name: 'permission_id',
        comment: '权限ID',
      })
      permissionId: string;

      @Column({
        type: 'int',
        comment: '排序，数值越大越靠后',
      })
      order: number;

      @AfterLoad()
      mixin() {
        this.parentId = String(this.parentId);
        this.permissionId = String(this.permissionId);
      }
}
