import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export function getMongoString(configService: ConfigService): string {
  // eslint-disable-next-line
  return 'mongodb://'
    + configService.get('MONGO_INITDB_ROOT_USERNAME')
    + ':'
    + configService.get('MONGO_INITDB_ROOT_PASSWORD')
    + '@'
    + configService.get('MONGO_HOSTNAME')
    + ':'
    + configService.get('MONGO_PORT')
    + '/'
    + configService.get('MONGO_INITDB_DATABASE');
}

function getMongoOptions(configService: ConfigService): any {
  return {};
}

export const getMongoConfig = async (configService: ConfigService): Promise<MongooseModuleFactoryOptions> => ({
  uri: getMongoString(configService),
  ...getMongoOptions(configService)
});
