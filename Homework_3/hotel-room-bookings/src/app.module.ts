import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsModule } from './rooms/rooms.module';
import { RoomsService } from './rooms/rooms.service';
import { LoggerService } from './logger/logger.service';

@Module({
  imports: [RoomsModule],
  controllers: [AppController, RoomsController],
  providers: [AppService, RoomsService, LoggerService],
})
export class AppModule {}
