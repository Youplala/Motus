import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { ApplicationComponent } from './views/home/application/application.component';
import { LoggingComponent } from './views/logging/logging.component';

import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './services/auth.service';
import { RequestService } from './services/request.service';
import { MotusService } from './services/motus.service';
import { ScoreService } from './services/score.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ApplicationComponent,
    LoggingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, RequestService, MotusService, ScoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
