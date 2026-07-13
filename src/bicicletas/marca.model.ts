import { Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("marcas")
export class MarcaModel {
    @PrimaryGeneratedColum('uuid')
    id: string

    @Colum({name: "nome"})
    nomeMarca: string
}