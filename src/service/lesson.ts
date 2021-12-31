import { Provide } from '@midwayjs/decorator'
import { InjectEntityModel } from '@midwayjs/orm';
import { LessonModel } from '../model/lesson'
import { Repository, getManager } from 'typeorm';

@Provide()
export class LessonService {

    @InjectEntityModel(LessonModel)
    lessonModel: Repository<LessonModel>;

    async updateLesson(lessonid?: string) {

    }

    async addLesson(title: string, category: string, image_url: string, video_url: string,info: string, video_duration: number ) {
        try {
            let result = await this.lessonModel.save({videoUrl: video_url, info: info, title: title, imageUrl: image_url, videoDuration: video_duration , category})
            return {result} 
        } catch (error) {
            return {}
        }
        
    }

    async lesson(category: string, page: number = 0, limitSize = 6) {
        let lessons =  await this.lessonModel
        .createQueryBuilder("lesson")
        .select()
        .where("lesson.category = :category", {category})
        .orderBy("lesson.id")
        .offset((page - 1) * limitSize )
        .limit(limitSize)
        .getMany()
        
        return lessons.map(e=>{
            let ele : any = {}
            ele.updatedAt = e.updatedAt
            ele.id = e.id
            ele.imageUrl = e.imageUrl
            ele.videoDuration = e.videoDuration
            ele.title = e.title
            return ele
        })
    }

    async getAllLessonCategory() {
        let r = await getManager().query(
            `SELECT category FROM lesson
            GROUP BY category
            `) as {category: string}[]
        return r.map((val) => { if (val.category === "")  { return "all" } else { return val.category}})
    }

    async lessonDetail(lessonId: string) {
        let lesson = await this.lessonModel.findOne({id: lessonId})
        if (lesson == undefined) {
            throw new Error(`have no lesson check lessonID ${lessonId}`);
        }
        return lesson
    }
}