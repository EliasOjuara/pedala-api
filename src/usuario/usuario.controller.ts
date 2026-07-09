import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioRequestDto } from './dto/usuario_request.dto';
import { UsuarioModel } from './usuario.model';
import { UsuarioEditarRequestDto } from './dto/usuario_editar_request.dto';
//import { Param } from '@nestjs/common';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService:UsuarioService){}

  // http://localhost:3000/usuarios
    @Get()
    async todosUsuarios():Promise<UsuarioModel[]>{
    return await this.usuarioService.listarUsuario()
    }

    // http://localhost:3000/usuarios/buscar/mjose@mail.com
    @Get("/buscar/:email")
    buscarPeloEmail(@Param("email") email:string){
      return this.usuarioService.buscarUsuarioPeloEmail(email)
    }

    // http://localhost:3000/usuarios?email=mjose@mail.com
    @Get("/buscar")
    buscarUsuarioPeloEmail(@Query("email") email:string){
      return this.usuarioService.buscarUsuarioPeloEmail(email)
    }

    //@Get("/buscar")
    //buscarUsuarioPorId(@Query("id") Id:string){
    //  return this.usuarioService.buscarUsuarioPorId(Id)
    //}

    @Post()
    async addUsuario(@Body() request:UsuarioRequestDto): Promise<void> {
    await this.usuarioService.salvarUsuario(request)
    }

    @Put("/editar/:id")
    @HttpCode(204)
    async editarUsuario(@Param("id") id:string, @Body request: UsuarioEditarRequestDto): Promise<void> {
      await this.usuarioService.editar(id, request)
    } 
}
