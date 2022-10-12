import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLogged = false

  constructor (public _authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLogged = this._authService.tokenIsValid
    
  }
}
