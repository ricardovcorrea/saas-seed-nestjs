import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @PrimaryGeneratedColumn('uuid')
    secretKey: string;
}