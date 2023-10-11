/**
 * Pipe to hash password before it event reaches controller
 */

import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordValidationPipe implements PipeTransform {
  
  public constructor(private readonly schema: Joi.ObjectSchema) {}

  public async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const { error, value: validatedValue } = this.schema.validate(value);

      if (error) {
        throw new BadRequestException(error.details[0].message);
      }

      const hashedPassword = await this.hashPassword(validatedValue.password);

      validatedValue.password = hashedPassword;

      return validatedValue;
    }

    return value;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
  
}
