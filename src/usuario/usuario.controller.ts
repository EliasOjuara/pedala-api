import { HttpCode, Delete, Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { request } from 'http';
import { UsuarioRequestDto } from './dto/usuario_request.dto';
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

    @Post()
    addUsuario(@Body() request:UsuarioRequestDto){
        this.usuarioService.salvarUsuario(request)
    }

    @Delete("/deletar")
    @HttpCode(204)
    deletarUsuario(@Query("email") email:string){
        this.usuarioService.removerUsuario(email)
    }

}
