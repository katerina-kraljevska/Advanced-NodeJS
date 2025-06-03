import { Injectable } from '@nestjs/common';
import { appendFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class LoggerService {
  private LOGS_PAT = join(process.cwd(), 'src', 'logger', 'data', 'logger.txt');

  addLog(msg: string) {
    const date = new Date();

    appendFile(this.LOGS_PAT, `${msg} @${date}\n`, 'utf-8');
  }
}
