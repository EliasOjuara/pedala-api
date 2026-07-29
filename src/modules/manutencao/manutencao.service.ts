import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ManutencaoModel } from './manutencao.model';
import { InjectRepository } from '@nestjs/typeorm';
import { BicicletasService } from '../bicicletas/bicicletas.service';
import { UsuarioService } from '../usuario/usuario.service';
import { StatusEstacao } from '../bicicletas/status_estacao.enum';
import { StatusManutencao } from './status_manutencao.enum';
import { UsuarioPapel } from '../usuario/papel.enun';
import { ManutencaoRequestDto } from './dto/manutencao_request.dto';
import { ManutencaoResponseDto } from './dto/manutencao_response.dto';
import { EditarManutencaoRequestDto } from './dto/editar_manutencao_request.dto';

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
    
        //TODO: mudar status da bicicleta
        await this.bicicletaService.atualizarStatus(bicicleta.id, 
            StatusEstacao.EM_MANUTENCAO)

        if(responsavel.perfil === UsuarioPapel.CLIENTE) {
            throw new 
            UnauthorizedException("Usuário não tem permissão de abertura de chamado")
        }
            
        const manutencao = this.manutencaoRepository.create({
            bicicleta,
            responsavel,
            statusManutencao: StatusManutencao.AGUARDANDO,
            descricao: request.descricao
        })

        await this.manutencaoRepository.save(manutencao)
    }
   
    async atualizarManutencao(
        idManutencao:string, 
        request: EditarManutencaoRequestDto)
    :Promise<void> {
        const manutencao = await this.manutencaoRepository.findOneBy({
            id: idManutencao
        })

        const tecnico = await this.usuarioService
            .buscarUsuarioPeloId(request.idTecnico)

        if (!manutencao) 
            throw new BadRequestException(`Nenhuma manutenção 
        encontrada com este id`)

        if(manutencao?.statusManutencao === StatusManutencao.AGUARDANDO &&
                manutencao.tecnico === null
        ){
            manutencao.statusManutencao = StatusManutencao.EM_ANDAMENTO
            manutencao.tecnico = tecnico
        } else {
            manutencao.statusManutencao = request.status || StatusManutencao.EM_ANDAMENTO
            manutencao.observacoes = request.observacoes
        }

        await this.manutencaoRepository.update(manutencao.id, manutencao)
    }

    async listarManutencoes():Promise<ManutencaoResponseDto[]> {
        const manutencoes = await this.manutencaoRepository.find({
            relations: {
                bicicleta: {
                    lotacao: true
                },
                tecnico: true,
                responsavel: true
            }
        })

        return manutencoes.map(m => this.converterModelEmResponse(m))
    }

    async buscarManutencaoPeloBicicleta(bicicletaId: string):Promise<ManutencaoResponseDto> {
        const manutencao =  await this.manutencaoRepository.findOne({
            where: {
                bicicleta: {
                    id: bicicletaId
                }
            },
            relations: {
                bicicleta: {
                    lotacao: true
                },
                tecnico: true,
                responsavel: true
            }
        })
        if(!manutencao)  throw new BadRequestException(`
            Nenhuma bicicleta em manutenção encontrada este id
        `)   
        return this.converterModelEmResponse(manutencao)
    }
    
    async buscarManutencaoPorId(idManutencao:string):Promise<ManutencaoResponseDto> {
             const manutencao =  await this.manutencaoRepository.findOne({
            where: {
                id: idManutencao
            },
            relations: {
                bicicleta: {
                    lotacao: true
                },
                tecnico: true,
                responsavel: true
            }
        })
        if(!manutencao)  throw new BadRequestException(`
            Nenhuma manutenção encontrada este id
        `)   
        return this.converterModelEmResponse(manutencao)
    }
    
    async solicitacaoPeloUsuarioAdmin(usuarioId: string):Promise<ManutencaoResponseDto> {
             const manutencao =  await this.manutencaoRepository.findOne({
            where: {
                responsavel: {
                    id: usuarioId
                }
            },
            relations: {
                bicicleta: {
                    lotacao: true
                },
                tecnico: true,
                responsavel: true
            }
        })
        if(!manutencao)  throw new BadRequestException(`
            Nenhuma bicicleta em manutenção encontrada este id
        `)   
        return this.converterModelEmResponse(manutencao)
    }

    converterModelEmResponse(m:ManutencaoModel):ManutencaoResponseDto {
        return {
            id: m.id,
            responsavel: m.responsavel.nome,
            tecnicoResponsavel: m.tecnico?.nome,
            descricaoServico: m.descricao,
            status: m.statusManutencao,
            observacoes: m.observacoes,
            dataRegistro: m.abertaEm,
            dataFinalizada: m.finalizadaEm            
        }
    }
}