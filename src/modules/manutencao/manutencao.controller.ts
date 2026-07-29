import { Body, Controller, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ManutencaoService } from './manutencao.service';
import { ManutencaoModel } from './manutencao.model';
import { ManutencaoRequestDto } from './dto/manutencao_request.dto';
import { ManutencaoResponseDto } from './dto/manutencao_response.dto';
import { StatusManutencao } from './status_manutencao.enum';
import { EditarManutencaoRequestDto } from './dto/editar_manutencao_request.dto';

@Controller('manutencao')
export class ManutencaoController {

    constructor(
        private readonly manutencaoService: ManutencaoService
    ){}

    @Post()
    async registrarManutencao(@Body() request: ManutencaoRequestDto):Promise<void> {
        await this.manutencaoService.addManutencao(request)
    }

    @Put("/atualizar/:id")
    @HttpCode(204)
    async editarManutencao(
        @Param("id") idManutencao: string, 
        @Body() request: EditarManutencaoRequestDto)
    : Promise<void>{
        await this.manutencaoService
            .atualizarManutencao(idManutencao, request)
    }

    @Get()
    async listarManutencoes():Promise<ManutencaoResponseDto[]>{
        return await this.manutencaoService.listarManutencoes()
    }
}