import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRequestDto } from './dto/usuario_request.dto';

@Injectable()
export class UsuarioService {    
    private usuarios:any = [
        {
            nome: "José Antônio",
            email: "jose@mail.com",
            telefone: "(86) 9.9988-0055"
        },
        {
            nome: "Maria José",
            email: "mjose@mail.com",
            telefone: "(86) 9.9988-5544"
        }
    ]

    salvarUsuario(dto: UsuarioRequestDto){
        const usuario = this.usuarios.find(u => u.email === dto.email)
        if(usuario) throw new BadRequestException(`Usuário ja cadastrado com email ${dto.email}`)
        this.usuarios.push(dto)
    }
    
    listarUsuario() {
        return this.usuarios
    }

    buscarUsuarioPeloEmail(email:string) {
        const usuario = this.usuarios
        . find(u => u.email === email)

        if (usuario === null || usuario === undefined) {
            throw new NotFoundException("Usuário não encontrado!")
        }

        return usuario
    }

    removerUsuario(email:string){
        const index = this.usuarios.findIndex(u => u.email === email)
        this.usuarios.splice(index, 1)
    }
        
}
