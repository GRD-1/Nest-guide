import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { ID_VALIDATION_ERROR } from './id-validation.constants';

@Injectable()
export class IdValidationPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    if (metadata.type !== 'param') return value;
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(ID_VALIDATION_ERROR);
    }
    return value;
  }
}
