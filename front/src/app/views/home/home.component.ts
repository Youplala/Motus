import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public _scoreService: ScoreService, public _authService: AuthService) {}

  ngOnInit() {
    this._scoreService.getScore();
  }

  public logout() {
    this._authService.logout();
  };
}
