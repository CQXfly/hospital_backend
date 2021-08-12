import { Provide } from '@midwayjs/decorator'
import { InjectEntityModel } from '@midwayjs/orm';
import { PatientModel } from '../model/patient'
import { DiseaseModel } from '../model/disease'
import { DiseasePhotoModel } from "../model/dieasePhoto";
import { getConnection, Repository } from 'typeorm';

@Provide()
export class DiseaseService {

    @InjectEntityModel(PatientModel)
    paitientModel: Repository<PatientModel>;

    @InjectEntityModel(DiseaseModel)
    diseaseModel: Repository<DiseaseModel>;

    @InjectEntityModel(DiseasePhotoModel)
    dieasePhotoModel: Repository<DiseasePhotoModel>;

    async getDiseases(patientId: string) {
        let disease = await this.diseaseModel.createQueryBuilder("disease").where('disease.patient_id = :patientId', { patientId }).getMany()
        return disease
    }

    async updatePhotos(photos: string[], dieaseId: string) {
        for (const element of photos) {
            let model = new DiseasePhotoModel()
            model.url = element
            model.disease_id = dieaseId
            await this.dieasePhotoModel.save(model)
        }
    }

    async getPhotos(diseaseId: string) {
        let photos = await this.dieasePhotoModel.createQueryBuilder("disease_photo").where('disease_photo.dieaseId = :diseaseId', { diseaseId }).getMany()
        return photos
    }

    async updateDiease(patient_id: string, did?: string, doctorId?: string, info?: string, stage?: string, type?: string) {
        if (did == undefined) {
            //creaIe
            let dmodel = new DiseaseModel()
            dmodel.info = info
            dmodel.stage = stage
            dmodel.type = type
            dmodel.patient_id = patient_id
            this.diseaseModel.save(dmodel)
        } else {
            console.log(info)
            let d = await this.diseaseModel.findOne({id: did})
            
            this.diseaseModel.save(d)
        }
    }

    async paitientsByDoctor(doctorId: string) {
        
        let paitients = await getConnection().createQueryBuilder().
        select('disease').from(DiseaseModel, "diease").groupBy('disease.paitient_id')
        .where("disease.doctor_id = :id", {id: doctorId}).getMany()
        console.log(paitients)
        
    }
 
    async isDocotor(wxid: string) {
        return false
    }
}