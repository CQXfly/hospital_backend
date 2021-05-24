import { Provide } from '@midwayjs/decorator'
import { InjectEntityModel } from '@midwayjs/orm';
import { LessonModel } from '../model/lesson'
import { Repository } from 'typeorm';

@Provide()
export class LessonService {

    @InjectEntityModel(LessonModel)
    lessonModel: Repository<LessonModel>;

    async updateLesson(lessonid?: string) {

    }


}