import { Provide } from '@midwayjs/decorator'
import { InjectEntityModel } from '@midwayjs/orm';
import { PatientModel } from '../model/patient'
import { ClockInModel } from '../model/clockIn'
import { Repository } from 'typeorm';

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

    async getUserCheckIn(userid: string, start: string, end: string ) {
        
    }    
}