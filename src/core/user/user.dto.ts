import { User } from "./user.entity";

export class DTOUser {
    id: number;
    email: string;

    constructor(model: User) {
        const { id, email } = model;

        this.id = id;
        this.email = email;
    }
}