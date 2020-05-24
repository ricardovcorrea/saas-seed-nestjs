import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DTOTheme } from './theme.dto';
import { Theme } from './theme.entity';
import { CrudService } from '../../shared/crud/crud.service';

@Injectable()
export class ThemeService extends CrudService<DTOTheme> {
    constructor(@Inject('THEME_REPOSITORY') private readonly themeRepository: Repository<Theme>) {
        super(themeRepository, DTOTheme);
    }

    async getActiveTheme(): Promise<DTOTheme> {
        const activeTheme = await this.themeRepository.findOne({ isActive: true });
        if (!activeTheme) {
            throw new NotFoundException('There is no active themes!');
        }

        return new DTOTheme(activeTheme);
    }
}
