
import { EntityModel } from "@midwayjs/orm"

import {
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseModel } from './base';

@EntityModel({
    name: 'permission',
})
export class PermissionModel extends BaseModel {
    @PrimaryGeneratedColumn({
        type: 'integer',
      })
      id: string;

      @Column({
        type: 'integer',
        name: 'doctor_id',
        comment: '医生的id',
      })
      doctor_id: string

      @Column({
        type: "bool",
        name: 'account_register',
        comment: '管理医生账号注册登记',
      })
      register: boolean;

      @Column({
        type: "bool",
        name: 'info_edit',
        comment: '医生信息编辑',
      })
      infoEdit: boolean;

      @Column({
        type: "bool",
        name: 'info_search',
        comment: '医生信查询',
      })
      info_search: boolean;

      @Column({
        type: "bool",
        name: 'video_upload',
        comment: '视频上传',
      })
      video_upload: boolean;
      
      @Column({
        type: "bool",
        name: 'video_edit',
        comment: '视频链接编辑',
      })
      video_edit: boolean;

      @Column({
        type: "bool",
        name: 'lesson_add',
        comment: '课程增加',
      })
      lesson_add: boolean;

      @Column({
        type: "bool",
        name: 'lesson_info',
        comment: '课程描述及定义',
      })
      lesson_info: boolean;

      @Column({
        type: "bool",
        name: 'check_paitient_diease',
        comment: '查看病人基本病情',
      })
      check_paitient_diease: boolean;

      @Column({
        type: "bool",
        name: 'check_paitient_info',
        comment: '查看病人基本信息',
      })
      check_paitient_info: boolean;

      @Column({
        type: "bool",
        name: 'check_paitient_privacy',
        comment: '查看病人隐私信息',
      })
      check_paitient_privacy: boolean;
}
