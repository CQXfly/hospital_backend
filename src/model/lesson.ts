import { EntityModel } from "@midwayjs/orm"

import {
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseModel } from './base';

@EntityModel({
    name: 'lesson',
})
export class LessonModel extends BaseModel {
    @PrimaryGeneratedColumn({
        type: 'integer',
      })
      id: string;

      @Column({
        type: 'varchar',
        name: 'video_url',
        comment: '视频链接',
      })
      videoUrl: string;

      @Column({
        type: 'varchar',
        name: 'title',
        comment: '课程标题',
      })
      title: string;

      @Column({
        type: 'varchar',
        name: 'info',
        comment: '课程信息',
      })
      info: string;
}
