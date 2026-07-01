import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
//import { Param } from '@nestjs/common';

@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService:UsuarioService){}

    @Get()
    todosUsuarios(){
        return this.usuarioService.listarUsuario()
    }

    // http://localhost:3000/usuarios/buscar/mjose@mail.com
    @Get("/buscar/:email")
    buscarPeloEmail(@Param("email") email:string){
        return this.usuarioService.buscarUsuarioPeloEmail(email)
    }

    // http://localhost:3000/usuarios/buscar?email=mjose@mail.com
    @Get("/buscar")
    buscarUsuarioPeloEmail(@Query("email") email:string){
        return this.usuarioService.buscarUsuarioPeloEmail(email)
    }

}
