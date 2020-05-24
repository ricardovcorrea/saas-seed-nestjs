import { EntityManager } from 'typeorm';
import { Theme } from './theme.entity';

export const ThemeProvider = {
    provide: 'THEME_REPOSITORY',
    useFactory: (manager: EntityManager) => manager.getRepository(Theme),
    inject: ['CUSTOMER_DATABASE_CONNECTION']
}