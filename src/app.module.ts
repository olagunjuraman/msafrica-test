import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Record } from './record/record.entity';
import { RecordController } from './record/record.controller';
import { RecordService } from './record/record.service';

import { AppDataSource } from './datasource';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        ...AppDataSource.options,
        autoLoadEntities: true,
      }),
    }),
    TypeOrmModule.forFeature([Record]),
  ],
  controllers: [AppController, RecordController],
  providers: [AppService, RecordService],
})
export class AppModule {}
