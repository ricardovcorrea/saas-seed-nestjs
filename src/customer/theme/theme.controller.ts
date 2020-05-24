import { Controller, Get } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { DTOTheme } from './theme.dto';
import { CrudController } from '../../shared/crud/crud.controller';

@Controller('customer/theme')
export class ThemeController extends CrudController<DTOTheme> {

    constructor(private readonly themeService: ThemeService) {
        super(themeService);
    }

    @Get()
    async getActiveTheme() {
        return this.themeService.getActiveTheme();
    }
}
