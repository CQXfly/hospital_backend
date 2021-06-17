import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { DoctorModel } from '../model/doctor'
import { PatientModel } from '../model/patient'
import { Repository } from 'typeorm';
@Provide()
export class UserService {
 
  @InjectEntityModel(DoctorModel)
  doctorModel: Repository<DoctorModel>;

  @InjectEntityModel(PatientModel)
  patientModel: Repository<PatientModel>;


  async isPatient(wxid: string): Promise<boolean> {
    const paitent = await this.patientModel.findOne({wxID: wxid})
    return paitent != undefined
  }

  async login(wxid: string) {
    const isPatient = await this.isPatient(wxid)
    if (isPatient) {
      const result = await this.patientModel.findOne({wxID: wxid})
      if (result == undefined) {
        throw new Error("havn't been user, please register first")
      }
      return {... result, type: 1}
    } else {
      const result =  await this.doctorModel.findOne({wxID: wxid})
      if (result == undefined) {
        throw new Error("havn't been user, please register first")
      }
      return {... result, type: 2}
    }
  }

  async reigsterDoctor(
    wxid: string, 
    name: string,
    contact?: string,
    jobNumber?: string) {

    let results = await this.doctorModel.find({wxID: wxid})
    if (results.length > 0) {
        throw new Error("has registered")
    }
    let doctor = new DoctorModel()

    doctor.wxID = wxid
    doctor.review = false
    doctor.name = name
    doctor.jobNumber = jobNumber
    doctor.super = false
    doctor.contact = contact
    let result = await this.doctorModel.save(doctor)
    return result
}


async reigsterPatient(wxid: string,
  age: number,
  name: string,
  address?: string,
  contact?: string,
  gender?: boolean) {

  let results = await this.patientModel.find({wxID: wxid})
  if (results.length > 0) {
      throw new Error("has registered")
  }
  let patient = new PatientModel()

  patient.wxID = wxid
  patient.address = address
  patient.age = age
  patient.contact = contact
  patient.gender = gender
  patient.name = name

  let result = await this.patientModel.save(patient)
  return result
}

  async findUserInfo(wxid: string): Promise<[DoctorModel, PatientModel]> {
    return Promise.all(
      [
        this.doctorModel.findOne({wxID: wxid}), 
        this.patientModel.findOne({wxID: wxid})
      ]
      )
  } 

  async fuck2(wxid: string) {
    let [p1, p2] = await this.findUserInfo(wxid)
    console.log(p1, p2)
    // if (p1 == undefined) {

    // } else (p2 == undefined) {

    // }
  }
}
