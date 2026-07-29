import { IsEnum, IsNotEmpty } from "class-validator"
import { StatusManutencao } from "../status_manutencao.enum"

export class ManutencaoRequestDto {
    
    @IsNotEmpty({message: "Campo tecnico obrigatório"})
    idTecnico: string

    @IsNotEmpty({message: "Campo status obrigatório"})
    @IsEnum(StatusManutencao, {message: "Status invalido"})
    status: StatusManutencao

    //@IsNotEmpty({ message: "Campo bicicleta obrigatório"})
    //bicicletaId: string

    //@IsNotEmpty({ message: "Campo responsável obrigatório"})
    //responsavelId: string
    
    //@IsNotEmpty({ message: "Campo descrição obrigatório"})
    //descricao: string
}