import { Customer } from "./customer.entity";

export class DTOCustomer {
    id: number;
    name: string;
    slug: string;
    secretKey: string;

    constructor(model: Customer) {
        const { id, name, slug, secretKey } = model;

        this.id = id;
        this.name = name;
        this.slug = slug;
        this.secretKey = secretKey;
    }
}