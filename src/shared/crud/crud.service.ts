import { PaginatedResponse } from "../paginatedResponse.dto";
import { NotFoundException } from "@nestjs/common";
import { ICrudService } from "./crud.service.interface";

export class CrudService<DTO> implements ICrudService<DTO> {
    constructor(public repository: any, public resultType: any) { }

    async getAll(page: number, perPage: number, sortBy: string, sort: string): Promise<PaginatedResponse<DTO[]>> {
        const [found, total] = await this.repository.findAndCount(
            {
                order: { [sortBy]: sort == "ASC" ? "ASC" : "DESC" },
                take: perPage,
                skip: (page - 1) * perPage
            }
        );

        return new PaginatedResponse<DTO[]>(found.map((result: any) => new this.resultType(result)), total);
    }

    async create(body: DTO): Promise<DTO> {
        const entity = this.repository.create(body);
        return await this.repository.save(entity);
    }

    async getById(id: string): Promise<DTO> {
        const found = await this.repository.findOne({ id });

        if (!found) {
            throw new NotFoundException();
        }

        return new this.resultType(found);
    }
}