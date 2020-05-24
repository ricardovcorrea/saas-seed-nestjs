import { Module } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { ThemeController } from './theme.controller';
import { ThemeProvider } from './theme.provider';
import { CustomerDatabaseProvider } from '../_database/database.provider';

@Module({
  providers: [CustomerDatabaseProvider, ThemeService, ThemeProvider],
  controllers: [ThemeController]
})
export class ThemeModule { }
