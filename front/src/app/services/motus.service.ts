import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root',
})
export class MotusService {
  constructor(
    private _requestService: RequestService,
    private _authService: AuthService
  ) {}

  public getFirstHint() {
    const token = this._authService.token;
    const path = 'motus/firstHint';
    return this._requestService.get(path + '/?token=' + token);
  }

  public guess(word: string) {
    const token = this._authService.token;
    const path = 'motus/guess';
    return this._requestService.get(
      path + '/?token=' + token + '&guess=' + word
    );
  }

  public isWord(word: string) {
    const token = this._authService.token;
    const path = 'motus/isWord';
    return this._requestService.get(
      path + '/?token=' + token + '&guess=' + word
    );
  }
}
