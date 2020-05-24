import { PaginatedResponse } from "../paginatedResponse.dto";

export interface ICrudService<DTO> {
    getAll(page: number, perPage: number, sortBy: string, sort: string): Promise<PaginatedResponse<DTO[]>>;
    create(body: DTO): Promise<DTO>;
    getById(id: string): Promise<DTO>;
}