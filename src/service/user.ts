import { Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { InjectEntityModel } from '@midwayjs/orm';
import { DoctorModel } from '../model/doctor'
import { PatientModel } from '../model/patient'
import { Repository } from 'typeorm';
@Provide()
export class UserService {
 
  @InjectEntityModel(DoctorModel)
  doctorModel: Repository<DoctorModel>;

  @InjectEntityModel(PatientModel)
  paientModel: Repository<PatientModel>;

  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    }
  }

  async findUserInfo(wxid: string): Promise<[DoctorModel, PatientModel]> {
    return Promise.all(
      [
        this.doctorModel.findOne({wxID: wxid}), 
        this.paientModel.findOne({wxID: wxid})
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
