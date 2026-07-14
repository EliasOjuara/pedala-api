import { Module } from '@nestjs/common';
import { ModeloController } from './modelo.controller';
import { ModeloService } from './modelo.service';

@Module({
  controllers: [ModeloController],
  providers: [ModeloService]
})
export class ModeloModule {}
