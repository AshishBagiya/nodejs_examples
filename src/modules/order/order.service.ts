import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Product } from '../product/product.entity';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
    constructor(private dataSource:DataSource){}

    async placeOrder(productId:string, quantity:number){
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            const product = await queryRunner.manager.findOne(Product,{ where :{id:productId}});

            if(!product || product.stock < quantity)
                    throw new Error('Insufficient stock');
            
            product.stock -= quantity;
            await queryRunner.manager.save(product);

            const order = await queryRunner.manager.create(Order,{
                quantity,
                totalPrice:product.price * quantity,
                product
            });

            await queryRunner.manager.save(order);
            await queryRunner.commitTransaction();
            return order;
        }catch(error){
            await queryRunner.rollbackTransaction();
            console.log('Error while placing order :',error);
        }finally{
            await queryRunner.release();
        }
    }
}
