import { Body, Controller, Get, Post } from '@nestjs/common';
import { ManutencaoService } from './manutencao.service';
import { ManutencaoModel } from './manutencao.model';
import { ManutencaoRequestDto } from './dto/manutencao_request.dto';

@Controller('manutencao')
export class ManutencaoController {

    constructor(
        private readonly manutencaoService: ManutencaoService
    ){}

    @Post()
    async registrarManutencao(@Body() request: ManutencaoRequestDto):Promise<void> {
        await this.manutencaoService.addManutencao(request)
    }

    @Get()
    async listarManutencoes():Promise<ManutencaoModel[]>{
        return []
    }
}