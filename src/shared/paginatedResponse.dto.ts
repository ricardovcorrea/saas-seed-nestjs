export class PaginatedResponse<T> {
    constructor(public data: T, public total: Number) {}
}