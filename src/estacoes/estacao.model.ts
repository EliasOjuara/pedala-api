import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("estacoes")
export class EstacaoModel {
    
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({ name: "nome"})
    nome: string

    @Column()
    capacidade: number

    @Column()
    ativa: boolean
}