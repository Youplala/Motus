import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { ApplicationComponent } from './views/home/application/application.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ApplicationComponent
  ],
  imports: [
    BrowserModule,
        HttpClientModule,
        AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
