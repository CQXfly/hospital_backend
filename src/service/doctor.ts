import { Provide } from '@midwayjs/decorator'
import { InjectEntityModel } from '@midwayjs/orm';
import { DoctorModel } from '../model/doctor'
import { Repository } from 'typeorm';
@Provide()
export class DoctorService {
    @InjectEntityModel(DoctorModel)
    doctorModel: Repository<DoctorModel>;


    async reigster(wxid: string) {

        let results = await this.doctorModel.find({wxID: wxid})
        if (results.length > 0) {
            return "go ahead"
        }
        let doctor = new DoctorModel()

        doctor.wxID = wxid
        doctor.review = false
        doctor.name = "李二狗"
        doctor.jobNumber = "1"
        doctor.super = false
        doctor.contact = "123"
        let result = await this.doctorModel.save(doctor)
        return result
    }

    async getUserCheckIn(userid: string, start: string, end: string ) {
        
    }

    async findDoctorsShouldReview() {
        // 是否是超级管理员
        return await this.doctorModel.find({review: false})
    }
}