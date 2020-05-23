import { Customer } from "./customer.entity";

export class DTOCustomer {
    id: number;
    name: string;

    constructor(model: Customer) {
        const { id, name } = model;

        this.id = id;
        this.name = name;
    }
}