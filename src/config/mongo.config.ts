import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export function getMongoString(configService: ConfigService): string {
  // eslint-disable-next-line
  return 'mongodb://'
    // + configService.get('MONGO_LOGIN')
    // + ':'
    // + configService.get('MONGO_PASSWORD')
    // + '@'
    + configService.get('MONGO_HOST')
    + ':'
    + configService.get('MONGO_PORT')
    + '/'
    + configService.get('MONGO_DATABASE');
}

function getMongoOptions(configService: ConfigService): any {
  return {};
}

export const getMongoConfig = async (configService: ConfigService): Promise<MongooseModuleFactoryOptions> => ({
  uri: getMongoString(configService),
  ...getMongoOptions(configService)
});
