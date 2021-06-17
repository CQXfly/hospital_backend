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
    async createLesson(@Body() title: string, @Body() info: string, @Body() video_url: string, @Body() image_url: string) : Promise<IResponse> {
        try {
            let result = await this.lessonService.addLesson(title,image_url, video_url, info)
            return response(result) 
        } catch (error) {
            return response({}, error.message, 400)
        }
    }

    @Get('/list')
    async list(@Query() page: number ) :Promise<IResponse> {
        try {
            let result = await this.lessonService.lesson(page)
            return response(result) 
        } catch (error) {
            return response({}, error.message, 400)
        }
    }
}
