import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DTOTheme } from './theme.dto';
import { Theme } from './theme.entity';

@Injectable()
export class ThemeService {
    constructor(@Inject('THEME_REPOSITORY') private readonly themeRepository: Repository<Theme>) { }

    async getAll(): Promise<DTOTheme[]> {
        const themes = await this.themeRepository.find();
        return themes.map(theme => new DTOTheme(theme));
    }

    async getActiveTheme(): Promise<DTOTheme> {
        const activeTheme = await this.themeRepository.findOne({ isActive: true });
        if (!activeTheme) {
            throw new NotFoundException('There is no active themes!');
        }

        return new DTOTheme(activeTheme);
    }
}
