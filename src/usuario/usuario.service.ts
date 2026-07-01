import { Injectable } from '@nestjs/common';

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
    
    listarUsuario() {
        return this.usuarios
    }

    buscarUsuarioPeloEmail(email:string) {
        const usuario = this.usuarios
        . find(u => u.email === email)
        return usuario
    }
        
}
