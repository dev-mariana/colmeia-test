import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(message?: string) {
    message
      ? super(message, HttpStatus.BAD_REQUEST)
      : super('Bad request', HttpStatus.BAD_REQUEST);
  }
}
