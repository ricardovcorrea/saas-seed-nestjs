import { Controller, Get } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';

@Controller('configuration')
export class ConfigurationController {

    constructor(private readonly configurationService: ConfigurationService) { }

    @Get()
    async teste() {
        const configurations = await this.configurationService.all();
        return configurations;
    }
}
