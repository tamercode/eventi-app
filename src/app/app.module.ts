import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppComponent } from './app.component';
import {EventsComponent} from './events/events.component';
import { EventComponent } from './events/event.componet';
import { NavbarComponent } from './navbar/navbar.component';
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  declarations: [
    AppComponent, EventsComponent, EventComponent, NavbarComponent, CalendarComponent,
  ],
  imports: [
    BrowserModule, ClarityModule.forRoot(), FormsModule, BrowserAnimationsModule, HttpClientModule, HttpModule, JsonpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: EventsComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent
      }
    ]),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
