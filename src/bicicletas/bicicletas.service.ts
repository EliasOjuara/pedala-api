import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BicicletaModel } from './bicicleta.model';
import { Repository } from 'typeorm';
import { ModeloService } from 'src/modelo/modelo.service';

@Injectable()
export class BicicletasService {

    constructor(
        @InjectRepository(BicicletaModel)
        private readonly bicicletaRepository: Repository<BicicletaModel>, private readonly modeloService: ModeloService
    ){}
}