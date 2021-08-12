
import { EntityModel } from "@midwayjs/orm"

import {
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseModel } from './base';

@EntityModel({
    name: 'disease_photo',
})
export class DiseasePhotoModel extends BaseModel {
    @PrimaryGeneratedColumn({
        type: 'integer',
      })
      id: string;

      @Column({
        type: 'integer',
        name: 'disease_id',
        comment: 'disease_id',
      })
      disease_id: string;

      @Column({
        type: 'varchar',
        name: 'url',
        comment: '病理照片信息',
      })
      url: string;
}
