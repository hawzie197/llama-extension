import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from "./core/modules/shared.module";
import 'hammerjs';
import { ApiService } from "./api.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
