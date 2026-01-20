import { Controller, Get } from '@nestjs/common';
import * as crypto from 'crypto';

@Controller('internals/thread-pool')
export class ThreadPoolController {

  @Get()
  runCrypto() {
    for (let i = 0; i < 5; i++) {
      crypto.pbkdf2(
        'password',
        'salt',
        100000,
        64,
        'sha512',
        () => {
          console.log('Hash done');
        },
      );
    }
    return 'Thread pool tasks started';
  }
}
