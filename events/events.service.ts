import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core/src/metadata/directives';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { TagContentType, Text } from '@angular/compiler';
import { Type } from '@angular/core/src/type';
import { Body } from '@angular/http/src/body';
import { Jsonp } from '@angular/http/src/http';
import { Event } from '../events/events.model'
import {ClrDatagridStateInterface} from '@clr/angular';
import { Response } from '_debugger';
import { HttpObserve } from '@angular/common/http/src/client';
import { ResponseContentType } from '@angular/http/src/enums';
import { HttpRequest } from '@angular/common/http/src/request';
import { HttpHandler } from '@angular/common/http/src/backend';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
  export class EventsService {

    private apiUrl = "http://localhost:3000/events";
    private evento: Event;

    constructor(private http: HttpClient) { }


    loadEvents(state: ClrDatagridStateInterface, currentPage: number) {
     let _limit = state.page.size;
     let apiUrlPage = 'http://localhost:3000/events?_limit=' + _limit + '&_page=' + currentPage;


     return this.http.get(apiUrlPage, {observe: 'response'});
    }


    save(event: Event, createFlag: boolean): Observable<Event>{
      if(createFlag){
        return this.createEvent(event);
      }
       return this.updateEvent(event);
       // return this.createEvent(event);
    }


    createEvent(event: Event): Observable<Event>{
      return this.http.post<Event>(this.apiUrl, event, httpOptions);
      }

    updateEvent (event: Event): Observable<any> {
      const url = `${this.apiUrl}/${event.id}`;
      return this.http.put(url, event, httpOptions);
    }

    deteteEvent(event: Event) {
      const url = `${this.apiUrl}/${event.id}`;
      return this.http.delete<Event>(url, httpOptions);
    }

  }
