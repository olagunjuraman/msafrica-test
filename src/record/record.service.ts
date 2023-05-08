import { Injectable } from '@nestjs/common';
import { Record } from './record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}

  async streamRecords() {
    const queryRunner =
      this.recordRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    const stream = await queryRunner.stream('SELECT * FROM record');
    return stream;
  }

  async readStreamInChunks(stream, chunkSize) {
    const chunks = [];
    let buffer = [];
    let count = 0;

    for await (const row of stream) {
      buffer.push(row);
      count++;

      if (count === chunkSize) {
        chunks.push(buffer);
        buffer = [];
        count = 0;
      }
    }

    if (buffer.length) {
      chunks.push(buffer);
    }

    return chunks;
  }
}
