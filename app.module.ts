import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';
import { ClarityModule } from '@clr/angular';



import { AppComponent } from './app.component';
import {EventsComponent} from './events/events.component';
import { EventComponent } from './events/event.componet';

@NgModule({
  declarations: [
    AppComponent, EventsComponent, EventComponent
  ],
  imports: [
    BrowserModule, ClarityModule.forRoot(), FormsModule, HttpClientModule, HttpModule, JsonpModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
