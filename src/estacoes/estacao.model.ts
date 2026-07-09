import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"

@Entity("estacoes")
export class EstacaoModel {
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column({name: 'nm_estacao'})
    nome:string //nome_estacao
    @Column()
    capcidade:string
    @Column()
    ativa:boolean
    @CreateDateColumn({name: 'dt_criacao'})
    dataCriacao: Date
}