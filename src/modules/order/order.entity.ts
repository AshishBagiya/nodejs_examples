import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../product/product.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id:string;

    @Column()
    quantity:number;
    @Column()
    totalPrice:number;

    @ManyToOne(() => Product,product => product.orders)
    product:Product;
}