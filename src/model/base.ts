import {
    CreateDateColumn,
    UpdateDateColumn,
    AfterLoad
} from 'typeorm'

export class BaseModel {
    id: string;
    @CreateDateColumn({
        type: 'timestamp',
        name: "created_at",
        default: () => 'LOCALTIMESTAMP'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: "updated_at",
        default: () => 'LOCALTIMESTAMP'
    })
    updatedAt: Date

    @AfterLoad()
    init(){
        this.id = String(this.id)
    }
}