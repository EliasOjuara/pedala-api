import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRequestDto } from './dto/usuario_request.dto';
import { UsuarioModel } from './usuario.model';
import { InjectRepository } from '@nestjs/typeorm';
import { privateDecrypt } from 'crypto';
import { Repository } from 'typeorm';
import { UsuarioEditarRequestDto } from './dto/usuario_editar_request.dto';

@Injectable()
export class UsuarioService {    
     constructor(
        @InjectRepository(UsuarioModel)
        private readonly usuarioRepository:Repository<UsuarioModel>
    ){}

    async salvarUsuario(dto: UsuarioRequestDto): Promise<void> {
        const existeUsuario = await this.usuarioRepository.findOne({
            where: {
                email: dto.email
            }
        })

        if (existeUsuario) throw new BadRequestException(`Usuário ja 
            cadastrado com este email`)

        await this.usuarioRepository.save(dto)
    }

    async listarUsuario(): Promise<UsuarioModel[]> {
        return await this.usuarioRepository.find()
    }

    async buscarUsuarioPeloEmail(email:string): Promise<UsuarioModel | null> {
        return await this.usuarioRepository.findOne({
            where: {
                email: email
            }
        })
    }

    async buscarUsuarioPorId(id: number): Promise<UsuarioModel> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: id as any }
        });
        if (!usuario) {
            throw new NotFoundException(`Usuário com o ID ${id} não foi encontrado`);
        }
        return usuario;
    }
    
    async editar(id:string, dto:UsuarioEditarRequestDto): Promise<void>{
        await this.usuarioRepository.update({id}, dto)
    }
}