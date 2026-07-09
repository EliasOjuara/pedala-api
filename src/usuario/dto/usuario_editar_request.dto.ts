import { IsOptional } from "class-validator"
import { IsPhoneNumber, MinLength } from "class-validator"

export class UsuarioEditarRequestDto {
    @MinLength(6)
    @IsOptional()
    nome:string

    @IsPhoneNumber('BR')
    @IsOptional()
    contato:string
}