import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BtnObservablesComponent } from './components/btn-observables/btn-observables.component';

@NgModule({
  declarations: [
    AppComponent,
    BtnObservablesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
