import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = async function (configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get('JWT_SECRET')
  };
};
