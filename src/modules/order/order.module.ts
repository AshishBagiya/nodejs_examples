import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { ProductModule } from '../product/product.module';

@Module({
  imports:[TypeOrmModule.forFeature([Order]),ProductModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
