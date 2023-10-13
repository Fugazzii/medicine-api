import { Injectable } from '@nestjs/common';

@Injectable()
export class KnnService {
  getHello(): string {
    return 'Hello World!';
  }
}
