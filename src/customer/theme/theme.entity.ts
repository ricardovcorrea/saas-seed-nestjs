import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Theme {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    primary: string;

    @Column()
    secondary: string;

    @Column()
    isActive: boolean;
}