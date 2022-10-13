import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token = localStorage.getItem('motus-token') || '';
  public name = localStorage.getItem('motus-name') || '';
  public tokenIsValid: boolean = false;


  constructor(private _requestService: RequestService) {
    if (this.token) {
      this.isTokenValid();
    }
  }

  public async login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, _) => {
      this._requestService.get('auth/login/?username='+username+'&password='+password).subscribe({
        next: (data: any) => {
          if (data.auth) {
            localStorage.setItem('motus-name', username);
            this.name = username;
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

  public async register(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, _) => {
      this._requestService.get('auth/register/?username='+username+'&password='+password).subscribe({
        next: (data: any) => {
          if (data.auth) {
            localStorage.setItem('motus-name', username);
            this.name = username;
            localStorage.setItem('motus-token', data.token);
            console.log('token', data)
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
    this._requestService.get('auth/checkToken/?token='+this.token).subscribe({
      next: (data: any) => {
        console.log(data)
        this.tokenIsValid = data.valid;
      }
    });
  }

  public logout(): void {
    localStorage.removeItem('motus-token');
    this.token = '';
    this.tokenIsValid = false;
    window.location.reload();
  }
}
