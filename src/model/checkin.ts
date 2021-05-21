
import { EntityModel } from "@midwayjs/orm"

import {
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseModel } from './base';

@EntityModel({
    name: 'checkin',
})
export class CheckInModel extends BaseModel {
    @PrimaryGeneratedColumn({
        type: 'integer',
      })
      id: string;

      @Column({
        type: 'integer',
        name: 'patient_id',
        comment: '病人',
      })
      patientId: string;

      @Column({
        type: 'date',
        name: 'Date',
        comment: '打卡日期',
      })
      date: string;

      @Column({
        type: 'integer',
        name: 'lesson_id',
        comment: '打卡课程',
      })
      lessonId: string;

      @Column({
        type: 'int',
        name: 'training_time',
        comment: '课程训练时长',
      })
      training_time: string;
}
