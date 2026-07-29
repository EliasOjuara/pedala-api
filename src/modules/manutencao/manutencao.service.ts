import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ManutencaoModel } from './manutencao.model';
import { InjectRepository } from '@nestjs/typeorm';
import { BicicletasService } from '../bicicletas/bicicletas.service';
import { UsuarioService } from '../usuario/usuario.service';
import { StatusEstacao } from '../bicicletas/status_estacao.enum';
import { StatusManutencao } from './status_manutencao.enum';
import { UsuarioPapel } from '../usuario/papel.enun';
import { ManutencaoRequestDto } from './dto/manutencao_request.dto';

@Injectable()
export class ManutencaoService {
    constructor(
        @InjectRepository(ManutencaoModel)
        private readonly manutencaoRepository: Repository<ManutencaoModel>,
        private readonly bicicletaService: BicicletasService,
        private readonly usuarioService: UsuarioService
    ){}

    async addManutencao(request: ManutencaoRequestDto):Promise<void> {
        const bicicleta = await this.bicicletaService
                .carregarBicicletaPeloId(request.bicicletaId)
        const responsavel = await this.usuarioService
                    .buscarUsuarioPeloId(request.responsavelId)
        
        console.log('**** ', bicicleta)

        //TODO: mudar status da bicicleta
        await this.bicicletaService.atualizarStatus(bicicleta.id, 
            StatusEstacao.EM_MANUTENCAO)

        if(responsavel.perfil === UsuarioPapel.CLIENTE) {
            throw new 
            BadRequestException("Usuário não tem permissão de abertura de chamado")
        }
            
        const manutencao = this.manutencaoRepository.create({
            bicicleta,
            responsavel,
            statusManutencao: StatusManutencao.AGUARDANDO,
            descricao: request.descricao
        })

        await this.manutencaoRepository.save(manutencao)
    }
   
    async atualizarManutencao(idManutencao, data: {}):Promise<void> {}

    async listarManutencoes():Promise<void> {}

    async buscarManutencaoPeloBicicleta(bicicletaId: string):Promise<void> {}
    
    async buscarManutencaoPorId(idManutencao:string):Promise<void> {}
    
    async solicitacaoPeloUsuarioAdmin(usuarioId: string):Promise<void> {}

}