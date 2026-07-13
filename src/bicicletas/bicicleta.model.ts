import { Column, Entity, JoinColumn, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { ModeloModel } from "./modelo.model"

@Entity("bicicletas")
export class Mar BicicletaModel {
    
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToMany(() ModeloModel)
    @JoinColumn({ name: "modelo_id"})
    modelo: ModeloModel

    @Column()
    status: boolean

    @CreateDataColumn({ name: "dt_cadastro", update: false})
    dataCadastro: Date
    
}