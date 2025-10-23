import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(message?: string) {
    message
      ? super(message, HttpStatus.NOT_FOUND)
      : super('Resource not found.', HttpStatus.NOT_FOUND);
  }
}
