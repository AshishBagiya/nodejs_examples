import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../order/order.entity";

@Entity()
export class Product {
@PrimaryGeneratedColumn()
    id:string;

    @Column()
    name:string;

    @Column()
    stock:number;

    @Column()
    price:number;

    @OneToMany(()=> Order, order => order.product)
    orders:Order[];
}