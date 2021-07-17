
import { EntityModel } from "@midwayjs/orm"

import {
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseModel } from './base';

@EntityModel({
    name: 'patient',
})
export class PatientModel extends BaseModel {
    @PrimaryGeneratedColumn({
        type: 'integer',
      })
      id: string;

      @Column({
        type: 'tinyint',
        name: 'gender',
        comment: '性别',
      })
      gender: boolean// 0| 1; 

      @Column({
        type: 'varchar',
        name: 'name',
        comment: '姓名',
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
        name: 'address',
        comment: '地址',
      })
      address: string;

      @Column({
        type: 'integer',
        name: 'age',
        comment: '年龄',
      })
      age: number;

      @Column({
        type: 'integer',
        name: 'doctor_id',
        comment: '医生id',
      })
      doctor_id: string;

      @Column({
        type: 'varchar',
        name: 'wx_id',
        comment: '微信id',
      })
      wxID: string;
}
