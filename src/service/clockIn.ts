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
        return await this.clockInModel.save(checkIn)
    }
    async getCheckIn(userid: string) {
        this.clockInModel.find({patientId: userid})
    }

    async getUserCheckInRecord(userid: string, start: string, end: string ) {
        const result = await this.clockInModel.createQueryBuilder("clock")
        .where("clock.patient_id = :userid", {userid})
        .andWhere("clock.date > :start", {start})
        .andWhere("clock.date < :end", {end})
        .getMany()
        
        
        // 数据处理 按照日期分类 [{day: duration}]
        let rr = []
        result.forEach(element => {
            rr.push(moment(element.date).format("MM-DD"))
        });
        return rr
    }    
}