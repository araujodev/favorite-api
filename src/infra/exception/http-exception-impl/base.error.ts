import { ApiProperty } from '@nestjs/swagger';

export class BaseError {
  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  timestamp: string;

  @ApiProperty({ example: '/path' })
  path: string;

  @ApiProperty({ example: 'failed' })
  message: string;
}

export class ResponseError {
  @ApiProperty({ type: BaseError })
  error: BaseError;
}
