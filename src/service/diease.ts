import { Provide } from '@midwayjs/decorator'
import { InjectEntityModel } from '@midwayjs/orm';
import { PatientModel } from '../model/patient'
import { DieaseModel } from '../model/diease'
import { DieasePhotoModel } from "../model/dieasePhoto";
import { getConnection, Repository } from 'typeorm';

@Provide()
export class DieaseService {

    @InjectEntityModel(PatientModel)
    paitientModel: Repository<PatientModel>;

    @InjectEntityModel(DieaseModel)
    dieaseModel: Repository<DieaseModel>;

    @InjectEntityModel(DieasePhotoModel)
    dieasePhotoModel: Repository<DieasePhotoModel>;


    async updatePhotos(photos: string[], dieaseId: string) {
        for (const element of photos) {
            let model = new DieasePhotoModel()
            model.url = element
            model.diease_id = dieaseId
            await this.dieasePhotoModel.save(model)
        }
    }

    async getPhotos(dieaseId: string) {
        let photos = this.dieasePhotoModel.createQueryBuilder("diease_photo").where('diease_photo.dieaseId := dieaseId', { dieaseId })
        return photos
    }

    async updateDiease(paient_id: string, did?: string, doctorId?: string, info?: string, stage?: string, type?: string) {
        if (did == undefined) {
            //creaIe
            let dmodel = new DieaseModel()
            dmodel.info = info
            dmodel.stage = stage
            dmodel.type = type
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
 
    async isDocotor(wxid: string) {
        return false
    }
}