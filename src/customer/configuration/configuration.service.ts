import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Configuration } from './configuration.entity';

@Injectable()
export class ConfigurationService {
    constructor(@Inject('CONFIGURATION_REPOSITORY') private readonly configurationRepository: Repository<Configuration>) { }

    async all() {
        return this.configurationRepository.find();
    }
}
