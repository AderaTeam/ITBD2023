import { Module } from '@nestjs/common';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';
import { databaseProviders } from '../database.providers';

@Module({
  controllers: [ProcessController],
  providers: [ProcessService, ...databaseProviders]
})
export class ProcessModule {}
