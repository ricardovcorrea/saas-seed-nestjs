import { Customer } from "./customer.entity";

export class DTOCustomer {
    id: string;
    name: string;
    slug: string;

    constructor(model: Customer) {
        const { id, name, slug } = model;

        this.id = id;
        this.name = name;
        this.slug = slug;
    }
}