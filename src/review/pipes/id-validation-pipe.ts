import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class IdValidationPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    if (metadata.type !== 'param' || metadata.metatype !== String) {
      throw new BadRequestException('Invalid parameter type');
    }
    const validFormats = [/^[0-9a-fA-F]{12}$/, /^[0-9a-fA-F]{24}$/, /^\d+$/];
    if (!validFormats.some((regex) => regex.test(value))) {
      throw new BadRequestException('Invalid ID format');
    }
    return value;
  }
}
