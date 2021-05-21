
import { EntityModel } from "@midwayjs/orm"

import {
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseModel } from './base';

@EntityModel({
    name: 'doctor',
})
export class DoctorModel extends BaseModel {
    @PrimaryGeneratedColumn({
        type: 'integer',
      })
      id: string;

      @Column({
        type: 'integer',
        name: 'job_number',
        comment: '工号',
      })
      jobNumber: string;

      @Column({
        type: 'varchar',
        name: 'name',
        comment: '医生姓名',
      })
      name: string;

      @Column({
        type: 'varchar',
        name: 'contact',
        comment: '联系方式',
      })
      contact: string;

      @Column({
        type: 'varchar',
        name: 'wx_id',
        comment: '微信id',
      })
      wxID: string;

      @Column({
        type: 'bool',
        name: 'super',
        comment: '超级管理员',
      })
      super: boolean;

      @Column({
        type: 'bool',
        name: 'review',
        comment: '信息是否审核',
      })
      review: boolean;
      
}
