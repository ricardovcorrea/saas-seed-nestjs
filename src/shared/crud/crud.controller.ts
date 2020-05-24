import { Get, Query, Post, Body } from "@nestjs/common";
import { ICrudService } from "./crud.service.interface";

export class CrudController<T> {

    constructor(public service: ICrudService<T>) { }

    @Get('list')
    async getAll(@Query() query) {
        const { page, perPage, sortBy, sort } = query;

        return this.service.getAll(page, perPage, sortBy, sort);
    }

    @Get('single')
    async getById(@Query() query) {
        const { id } = query;

        return this.service.getById(id);
    }

    @Post('create')
    async create(@Body() body) {
        return this.service.create(body);
    }

}