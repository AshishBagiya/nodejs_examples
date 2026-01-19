import { Injectable } from "@nestjs/common";
import { PaymentFactory } from "./payment.factory";

@Injectable()
export class PaymentService {
    constructor(private paymentFactory:PaymentFactory){}

    async processPayment(type:string,amount:number){
        const factory = this.paymentFactory.createPayment(type);
        return factory.pay(amount);
    }
}