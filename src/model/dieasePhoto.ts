
import { EntityModel } from "@midwayjs/orm"

import {
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseModel } from './base';

@EntityModel({
    name: 'diease_photo',
})
export class DieaseModel extends BaseModel {
    @PrimaryGeneratedColumn({
        type: 'integer',
      })
      id: string;

      @Column({
        type: 'integer',
        name: 'diease_id',
        comment: 'diease_id',
      })
      diease_id: string;

      @Column({
        type: 'varchar',
        name: 'url',
        comment: '病理照片信息',
      })
      url: string;
}
