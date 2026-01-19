import { Injectable } from "@nestjs/common";
import { EmailLogin, GoogleLogin, LoginStrategy, OtpLogin } from "./login.strategy";

@Injectable()
export class AuthStrategy {
    private strategies : Record<string, LoginStrategy>= {};
    constructor(){
        this.strategies['email'] = new EmailLogin();
        this.strategies['otp'] = new OtpLogin();
        this.strategies['google'] = new GoogleLogin();
    }

    execute(type:string, credentials:any):string{
        const strategy = this.strategies[type];

        if(!strategy) throw new Error('Invalid login type');

        return strategy.login(credentials);
    }
}