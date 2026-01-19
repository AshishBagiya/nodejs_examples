export interface LoginStrategy {
    login(credentials:any):string
}

export class EmailLogin implements LoginStrategy {
    login(credentials: any): string {
        return `Login with Email ${credentials.email}`
    }
}

export class OtpLogin implements LoginStrategy {
    login(credentials: any): string {
        return `Login with OTP ${credentials.phone}`
    }
    
}

export class GoogleLogin implements LoginStrategy {
    login(credentials: any) {
      return `Login with Google: ${credentials.token}`;
    }
  }