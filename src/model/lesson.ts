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
        type: 'integer',
        name: 'video_length',
        comment: '视频长度 10 分钟',
      })
      videoDuration: number;

      @Column({
        type: 'varchar',
        name: 'image_url',
        comment: '图片链接',
      })
      imageUrl: string;

      @Column({
        type: 'varchar',
        name: 'title',
        comment: '课程标题',
      })
      title: string;

      @Column({
        type: 'text',
        name: 'info',
        comment: '课程信息',
      })
      info: string;
}
