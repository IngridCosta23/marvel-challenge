import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';
import {ListCharactersComponent } from './list-characters/list-characters.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { MarvelapiService } from './service/marvel/marvelapi.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListCharactersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
   
  ],
  providers: [MarvelapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
