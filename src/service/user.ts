import { Provide, Plugin, Inject, Config } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { DoctorModel } from '../model/doctor'
import { PatientModel } from '../model/patient'
import { In, Repository } from 'typeorm';

import { Jwt, JwtEggConfig } from '@waiting/egg-jwt'
import { Context } from 'egg'
import { JwtAuthMiddlewareConfig } from '../config/config.types'
@Provide()
export class UserService {
  @Config('jwt')
  jwtConfig: JwtEggConfig;

  @Config('jwtAuth')
  jwtAuthConfig: JwtAuthMiddlewareConfig;

  @Plugin()
  jwt: Jwt

  @Inject()
  ctx: Context
 
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
      const userInfo = await this.patientModel.findOne({wxID: wxid})
      if (userInfo == undefined) {
        throw new Error("havn't been user, please register first")
      }
      return { userInfo, type: 1}
    } else {
      const userInfo =  await this.doctorModel.findOne({wxID: wxid})
      if (userInfo == undefined) {
        throw new Error("havn't been user, please register first")
      }
      return { userInfo, type: 2}
    }
  }


  async reigsterDoctor(
    wxid: string, 
    name: string,
    contact?: string,
    jobNumber?: string) {

      let [results, presults] = await Promise.all(
        [
          this.doctorModel.find({wxID: wxid}),
          this.patientModel.find({wxID: wxid})
        ])
    if (results.length > 0) {
        throw new Error("has registered")
    }
    
    if (presults.length > 0) {
        throw new Error("has registered patient")
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

async updateDoctor(
  wxid: string, 
  name: string,
  contact?: string,
  jobNumber?: string) {
    let f = await this.doctorModel.findOne({wxID: wxid})
    if (f == undefined) {
      throw new Error("hasn't registered")
    }
    let doctor = new DoctorModel()
    if (contact != undefined) {
      doctor.contact = contact  
    }
    
    if (jobNumber != undefined) {
      doctor.jobNumber = jobNumber   
    }

    if (name != undefined) {
      doctor.name = name   
    }
    
    await this.doctorModel.update({wxID: wxid}, doctor)
    return await this.doctorModel.findOne({wxID: wxid})
  }

async updatePatient(
  wxid: string,
  age?: number,
  name?: string,
  address?: string,
  contact?: string,
  gender?: boolean
) {
  let f = await this.patientModel.findOne({wxID: wxid})
  if (f == undefined) {
    throw new Error("hasn't registered")
  }

  let patient = new PatientModel()

  patient.wxID = wxid
  if (age != undefined) {
    patient.age = age  
  }

  if (address != undefined) {
    patient.address = address  
  }
  
  if (contact != undefined) {
    patient.contact = contact  
  }
  
  if (gender != undefined) {
    patient.gender = gender  
  }
  
  if (name != undefined) {
    patient.name = name   
  }
  
  await this.patientModel.update({wxID: wxid}, patient)
  return await this.patientModel.findOne({wxID: wxid})
}


async reigsterPatient(wxid: string,
  age: number,
  name: string,
  address?: string,
  contact?: string,
  gender?: boolean) {

  let [results, dresults] = await Promise.all(
    [
      this.patientModel.find({wxID: wxid}),
      this.doctorModel.find({wxID: wxid})
    ])
  if (results.length > 0) {
      throw new Error("has registered")
  }
  if (dresults.length > 0) {
      throw new Error("has registered doctor")
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

  async findDoctors(doctorids: string[]) {
    let r = await this.doctorModel.find({id: In(doctorids)})
    return r
  }

  async findAllPatientsByDoctor(doctorid: string) {
    let patients = await this.patientModel.createQueryBuilder("patient").where('patient.doctor_id = :doctorid', {doctorid}).getMany()
    return await this.findPatients(patients.map(item => { return item.id }))
  }

  async findDoctorByPatientId(patientId: string) {
    let patient = await this.patientModel.findOne({id: patientId})
    
    return patient.doctor_id
    // patient.doctor_id
    // disease---> doctor
    // return await this.findPatients(patients.map(item => { return item.id }))
  }

  async findPatients(patientids: string[]) {
    return await this.patientModel.find({id: In(patientids)})
  }

  async bindPatient(patientid: string, doctorid: string) {
    let results = await Promise.all([this.patientModel.findOne({id: patientid}),
    this.doctorModel.findOne({id: doctorid})])
    
    if (results.indexOf(undefined) > -1) {
      throw new Error("have no patient or doctor");
    }
    let patient = results[0]
    patient.doctor_id = doctorid
    return await this.patientModel.save(patient)
  }

  async createUserToken(wxid: string) {
      const token: string = this.jwt.sign(
        {wxid: '123'},
        this.jwtConfig.client.secret,
        {expiresIn: this.jwtAuthConfig.accessTokenExpiresIn}
      )
      return token
  }

  async findPatient(patientId: string) {
    const userInfo = await this.patientModel.findOne({id: patientId})
    return userInfo
  }
}
