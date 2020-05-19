import { EntityManager } from 'typeorm';
import { Configuration } from './configuration.entity';

export const ConfigurationProvider = {
    provide: 'CONFIGURATION_REPOSITORY',
    useFactory: (manager: EntityManager) => manager.getRepository(Configuration),
    inject: ['CUSTOMER_DATABASE_CONNECTION']
}