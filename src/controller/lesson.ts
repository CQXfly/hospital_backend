import { Inject, Controller, Provide, Post, Body, Query, Get } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IResponse, response } from '../common/helper';
// import DefaultResponseState, { IResponse } from '../common/interface';
import { LessonService } from '../service/lesson';

@Provide()
@Controller("/lesson")
export class LessonController {
    @Inject()
    ctx: Context;

    @Inject()
    lessonService: LessonService

    @Post('/create')
    async createLesson(
        @Body() title: string, 
        @Body() info: string, 
        @Body() video_url: string, 
        @Body() image_url: string, 
        @Body() video_duration: number,
        @Body() category: string,
        ) : Promise<IResponse> {
        try {
            let result = await this.lessonService.addLesson(title, category, image_url, video_url, info, video_duration)
            return response(result) 
        } catch (error) {
            return response({}, error.message, 400)
        }
    }

    @Get('/categoryList')
    async categoryList(@Query() page: number ) :Promise<IResponse> {
        try {
            let result = await this.lessonService.getAllLessonCategory()
            return response(result) 
        } catch (error) {
            return response({}, error.message, 400)
        }
    }

    @Get('/list')
    async list(@Query() page: number, @Query() category: string ) :Promise<IResponse> {
        try {
            if (category === "all" || category == undefined) {
                category = ""
            }

            if (page == undefined || page <= 0) {
                page = 1
            }
            let result = await this.lessonService.lesson(category, page)
            return response(result) 
        } catch (error) {
            return response({}, error.message, 400)
        }
    }

    @Get('/detail')
    async detail(@Query() lessonId: string) {
        try {
            let result = await this.lessonService.lessonDetail(lessonId)
            return response(result)
        } catch (error) {
            return response({}, error.message, 400)
        }
    }
}
