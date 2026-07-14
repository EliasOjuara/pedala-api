import { Module } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { MarcaController } from './marca.controller';
import { MarcaService } from './marca.service';

@Module({
  providers: [MarcaService],
  controllers: [MarcaController]
})
export class MarcaModule {}
