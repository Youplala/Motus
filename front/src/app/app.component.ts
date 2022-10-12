import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public token = localStorage.getItem('motus-token') || '';

  public onLog(event: string) {
    this.token = event;
  }
}
