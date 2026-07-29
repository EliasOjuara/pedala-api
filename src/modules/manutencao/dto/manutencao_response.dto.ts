import { StatusManutencao } from "../status_manutencao.enum"

export class ManutencaoResponseDto {
    id: string
    responsavel: string
    status: StatusManutencao
    dataRegistro: Date
    dataFinalizada?:Date
    descricaoServico: string
    observacoes?: string
    tecnicoResponsavel?: string 
}