import { Provide } from '@midwayjs/decorator'
import { InjectEntityModel } from '@midwayjs/orm';
import { PatientModel } from '../model/patient'
import { DieaseModel } from '../model/diease'
import { getConnection, Repository } from 'typeorm';

@Provide()
export class DieaseService {

    @InjectEntityModel(PatientModel)
    paitientModel: Repository<PatientModel>;

    @InjectEntityModel(DieaseModel)
    dieaseModel: Repository<DieaseModel>;

    async updateDiease(paient_id: string, did?: string, doctorId?: string, info?: string, stage?: string, type?: string) {
        if (did == undefined) {
            //create
            let dmodel = new DieaseModel()
            dmodel.info = ""
            dmodel.stage = "32"
            dmodel.type = "juez"
            dmodel.paient_id = paient_id
            this.dieaseModel.save(dmodel)
        } else {
            console.log(info)
            let d = await this.dieaseModel.findOne({id: did})
            
            this.dieaseModel.save(d)
        }
    }

    async paitientsByDoctor(doctorId: string) {
        
        let paitients = await getConnection().createQueryBuilder().
        select('diease').from(DieaseModel, "diease").groupBy('diease.paitient_id')
        .where("diease.doctor_id = :id", {id: doctorId})
        console.log(paitients)
    }

    
 
}