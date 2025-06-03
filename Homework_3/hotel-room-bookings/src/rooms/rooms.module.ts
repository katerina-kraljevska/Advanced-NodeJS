import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { LoggerModule } from 'src/logger/logger.module';
import { RoomsController } from './rooms.controller';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  imports: [LoggerModule],
  controllers: [RoomsController],
  providers: [RoomsService, LoggerService],
})
export class RoomsModule {}
