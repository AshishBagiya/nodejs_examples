import { Controller, Get } from '@nestjs/common';

@Controller('internals')
export class EventLoopController {

  @Get('non-blocking')
  nonBlocking() {
    setTimeout(() => {
      console.log('Timer executed');
    }, 0);

    Promise.resolve().then(() => {
      console.log('Promise resolved');
    });

    process.nextTick(() => {
      console.log('Next tick');
    });

    return 'Check console output order';
  }

  @Get('blocking')
  blocking() {
    const start = Date.now();
    while (Date.now() - start < 5000) {}
    return 'Blocked event loop for 5 seconds';
  }
}
