import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { EstadisticaModule } from './estadistica/estadistica.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    EstadisticaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
