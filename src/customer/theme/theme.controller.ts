import { Controller, Get } from '@nestjs/common';
import { ThemeService } from './theme.service';

@Controller('customer/theme')
export class ThemeController {

    constructor(private readonly themeService: ThemeService) { }
    
    @Get()
    async getActiveTheme() {
        return this.themeService.getActiveTheme();
    }

    @Get('list')
    async getAll() {
        return this.themeService.getAll();
    }
}
