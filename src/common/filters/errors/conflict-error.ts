import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
  constructor() {
    super('Customer already exists.', HttpStatus.CONFLICT);
  }
}
