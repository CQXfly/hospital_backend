import { Provide } from '@midwayjs/decorator'
import { InjectEntityModel } from '@midwayjs/orm';
import { PatientModel } from '../model/patient'
import { Repository } from 'typeorm';
@Provide()
export class PatientService {
    @InjectEntityModel(PatientModel)
    patientModel: Repository<PatientModel>;


    async updateUserInfo(wxid: string, address?: string, age?: number, contact?: string) {
        let results = await this.patientModel.find({wxID: wxid})
        if (results.length > 0) {
            return "go ahead"
        }
        
        let patient = new PatientModel()

        patient.wxID = wxid
        patient.address = ""
        patient.age = 123
        patient.contact = ""
 
        let result = await this.patientModel.save(patient)

        return result
    }


    async reigster(wxid: string) {

        let results = await this.patientModel.find({wxID: wxid})
        if (results.length > 0) {
            throw new Error("has registered")
        }
        let patient = new PatientModel()

        patient.wxID = wxid
        patient.address = ""
        patient.age = 123
        patient.contact = ""
 
        let result = await this.patientModel.save(patient)
        return result
    }

    async getUserCheckIn(userid: string, start: string, end: string ) {
        
    }    
}