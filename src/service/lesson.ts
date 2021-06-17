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

    async addLesson(title: string, image_url: string, video_url: string,info: string ) {
        try {
            let result = await this.lessonModel.save({videoUrl: video_url, info: info, title: title, imageUrl: image_url})
            return result 
        } catch (error) {
            return {}
        }
        
    }

    async lesson(page: number = 0, limitSize = 2) {
        let lessons =  await this.lessonModel
        .createQueryBuilder("user")
        .select()
        .orderBy("user.id")
        .offset((page - 1) * limitSize )
        .limit(limitSize)
        .getMany()
        return lessons
    }
}