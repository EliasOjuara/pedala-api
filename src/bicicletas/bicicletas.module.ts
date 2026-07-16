import { Module } from '@nestjs/common';
import { BicicletasService } from './bicicletas.service';
import { BicicletasController } from './bicicletas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeloModel } from './modelo.model';
import { BicicletaModel } from './bicicleta.model';

@Module({
  imports: [TypeOrmModule.forFeature([BicicletaModel]), ModeloModel],
  providers: [BicicletasService],
  controllers: [BicicletasController]
})
export class BicicletasModule {}