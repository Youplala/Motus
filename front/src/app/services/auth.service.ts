import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { SHA256 } from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private container = 'localhost';

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
      this._requestService
        .get(
          this.container,
          'auth/login/?username=' + username + '&password=' + SHA256(password)
        )
        .subscribe({
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
        });
    });
  }

  public async register(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, _) => {
      this._requestService
        .get(
          this.container,
          'auth/register/?username=' +
            username +
            '&password=' +
            SHA256(password)
        )
        .subscribe({
          next: (data: any) => {
            console.log('register', data);
            if (data.auth) {
              this.login(username, password).then((res) => {
                resolve(true)
              });
            } else {
              resolve(false);
            }
          },
        });
    });
  }

  public isTokenValid(): void {
    this._requestService
      .get(this.container, 'auth/checkToken/?token=' + this.token)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.tokenIsValid = data.valid;
        },
      });
  }

  public logout(): void {
    localStorage.removeItem('motus-token');
    this.token = '';
    this.tokenIsValid = false;
    window.location.reload();
  }
}
