import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token = localStorage.getItem('motus-token') || '';
  public tokenIsValid = false;


  constructor(private _requestService: RequestService) {
    if (this.token) {
      this.isTokenValid();
    }
  }

  public async login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._requestService.get('auth/login/?username='+username+'&password='+password).subscribe({
        next: (data: any) => {
          if (data.auth) {
            localStorage.setItem('motus-token', data.token);
            this.token = data.token;
            this.tokenIsValid = true;
            resolve(true);
          } else {
            resolve(false);
          }
        },
      })
    })    
  }

  public isTokenValid(): void {
    console.log('Check token validity')
    this._requestService.get('auth/checkToken/?token='+this.token).subscribe({
      next: (data: any) => {
        console.log(data)
        this.isTokenValid = data.valid;
      }
    });
  }
 

}
