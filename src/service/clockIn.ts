import { Provide } from '@midwayjs/decorator'
import { InjectEntityModel } from '@midwayjs/orm';
import { PatientModel } from '../model/patient'
import { ClockInModel } from '../model/clockIn'
import { Repository } from 'typeorm';
import moment = require('moment');

@Provide()
export class ClockInService {

    @InjectEntityModel(PatientModel)
    paitientModel: Repository<PatientModel>;

    @InjectEntityModel(ClockInModel)
    clockInModel: Repository<ClockInModel>;

    async clockIn(
        userid: string, 
        duration: number, 
        lessonid: string, 
        date: string
        ) {
        let checkIn = new ClockInModel()
        checkIn.date = date
        checkIn.patientId = userid
        checkIn.training_time = duration
        checkIn.lessonId = lessonid
        // check 该lessonid 下是否已经有了打卡记录
        let hasRecordModel = await this.getCheckInRecordWithLessonId(userid, lessonid, date)
        if (hasRecordModel != undefined) {
            return await this.clockInModel.update(hasRecordModel, checkIn)
        } else {
            return await this.clockInModel.save(checkIn)
        }
        
    }

    async getCheckInRecordWithLessonId(userid: string, lessonId: string, date: string) {
        let timestamp = moment(date).valueOf()
        let dayTimestamp = timestamp + 60 * 60 * 24 * 1000 + 1
        let dayDate = moment(dayTimestamp).format()
        return await this.clockInModel.createQueryBuilder("clock")
        .where("clock.patient_id = :userid", {userid})
        .andWhere("clock.lesson_id = :lessonId", {lessonId})
        .andWhere("clock.date >= :date", {date})
        .andWhere("clock.date <= :dayDate", {dayDate})
        .getOne()
    }

    async getCheckIn(userid: string) {
        this.clockInModel.find({patientId: userid})
    }

    // 获取每日打卡的数据，相同日期的数据会合并掉
    async getUserCheckInRecord(userid: string, start: string, end: string ) {
        const result = await this.clockInModel.createQueryBuilder("clock")
        .where("clock.patient_id = :userid", {userid})
        .andWhere("clock.date >= :start", {start})
        .andWhere("clock.date <= :end", {end})
        .getMany()
        
        // 数据处理 按照日期分类 [{day: duration}]
        let dateResult = []
        result.forEach(element => {
            let date = moment(element.date).format("MM-DD")
            if (!dateResult.includes(date)) {
                dateResult.push(date)
            } 
        });
        return dateResult
    }

    async GetUserCheckInRecordWithLessonId() {
        
    }
}