import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ConfigurationController } from './configuration.controller';
import { CustomerDatabaseProvider } from '../database/database.provider';
import { ConfigurationProvider } from './configuration.provider';

@Module({
  providers: [CustomerDatabaseProvider, ConfigurationService, ConfigurationProvider],
  controllers: [ConfigurationController]
})
export class ConfigurationModule { }
