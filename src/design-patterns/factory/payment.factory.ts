import { Injectable } from "@nestjs/common";

interface PaymentGateway {
    pay(amount:number):string;
}

class StripePayment implements PaymentGateway{
    pay(amount: number): string {
       return `Paid ${amount} via stripe`;
    }
}

class PaypalPayment implements PaymentGateway{
    pay(amount: number): string {
        return `Paid ${amount} via paypal`;
    }

}

@Injectable()
export class PaymentFactory {
    constructor(){}
    createPayment(type:string) : PaymentGateway {
        switch (type) {
            case 'stripe':
                return new StripePayment();
            case 'paypal':
                return new PaypalPayment();
            default:
                throw new Error('Invalid Payment Type');
        }
    }
} 