import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MarcaModel } from "./marca.model";

@Entity("modelos")
export class ModeloModel {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nome: "modelo"})
    nomeModelo: string

    @ManyToOne(() => MarcaModel)
    @JoinColumn({ name: "marca_id"})
    noem: MarcaModel
}