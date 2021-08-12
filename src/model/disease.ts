
import { EntityModel } from "@midwayjs/orm"

import {
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseModel } from './base';

@EntityModel({
    name: 'disease',
})
export class DiseaseModel extends BaseModel {
    @PrimaryGeneratedColumn({
        type: 'integer',
      })
      id: string;

      @Column({
        type: 'integer',
        name: 'doctor_id',
        comment: '医生id',
      })
      doctorId: string;

      @Column({
        type: 'integer',
        name: 'patient_id',
        comment: '病人id',
      })
      patient_id: string;

      @Column({
        type: 'varchar',
        name: 'type',
        comment: '疾病类型',
      })
      type: string;

      @Column({
        type: 'varchar',
        name: 'info',
        comment: '疾病信息',
      })
      info: string;

      @Column({
        type: 'varchar',
        name: 'stage',
        comment: '疾病阶段',
      })
      stage: string;
}
