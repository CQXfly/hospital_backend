import { Provide } from '@midwayjs/decorator'
import { InjectEntityModel } from '@midwayjs/orm';
import { PatientModel } from '../model/patient'
import { CheckInModel } from '../model/checkin'
import { Repository } from 'typeorm';

@Provide()
export class CheckInService {

    @InjectEntityModel(PatientModel)
    paitientModel: Repository<PatientModel>;

    @InjectEntityModel(CheckInModel)
    checkInModel: Repository<CheckInModel>;

    async checkIn(userId: string) {
        this.checkInModel.find({patientId: userId})
    }

    async getUserCheckIn(userid: string, start: string, end: string ) {
        
    }    
}