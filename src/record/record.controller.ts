import { Controller, Get, Res } from '@nestjs/common';
import { RecordService } from './record.service';
import { Response } from 'express';
import { Readable } from 'stream';

@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get()
  async streamRecords(@Res() res: Response) {
    const stream = (await this.recordService.streamRecords()) as Readable;

    res.write('['); // Start the JSON array

    let isFirstChunk = true;
    stream.on('data', (chunk) => {
      if (!isFirstChunk) {
        res.write(','); // Add a comma between JSON objects
      } else {
        isFirstChunk = false;
      }
      res.write(JSON.stringify(chunk));
    });

    stream.on('end', () => {
      res.write(']'); // End the JSON array
      res.end();
    });

    stream.on('error', (err) => {
      console.error('Error while streaming records:', err);
      res.status(500).end();
    });
  }
}
