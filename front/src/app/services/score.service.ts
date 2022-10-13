import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { RequestService } from './request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  constructor(
    public _requestService: RequestService,
    public _authService: AuthService
  ) {}

  public getRecords() {
    const token = this._authService.token;
    const path = 'score/getToday';
    return this._requestService.get(path + '/?token=' + token);
  }
  public score:any[] = []
  public moyenne: number = 0

  public getScore() {
    const token = this._authService.token;
    const path = 'score/getScore';
    this._requestService.get(path + '/?token=' + token).subscribe({
      next: (data: any) => {
        this.score = data;
      },
      complete: () => {
        // Check if the user has played at least one game
        if (this.score.length > 0) {
          this.moyenne = 0
          this.score.forEach((element: any) => {
            this.moyenne += element.nb_try;
          });
          this.moyenne = this.moyenne / this.score.length;
        } else {
          this.moyenne = 0;
        }
      }

    });
  }
}
