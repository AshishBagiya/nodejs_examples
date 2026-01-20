import { Controller, Get, Res } from '@nestjs/common';
import { createReadStream } from 'fs';
import type { Response } from 'express';

@Controller('internals/stream')
export class StreamController {

  @Get()
  streamFile(@Res() res: Response) {
    const stream = createReadStream('./large-file.log');
    stream.pipe(res);
  }
}
