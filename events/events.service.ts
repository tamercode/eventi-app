import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core/src/metadata/directives';
import { Injectable } from '@angular/core';
import { Event } from '../events/events.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class EventsService {

  private apiUrl = 'http://localhost:3000/events?&';
  constructor(private http: HttpClient) { }


  sendRequest() {


    const newURL = this.apiUrl;
    this.apiUrl = 'http://localhost:3000/events?&';
    return this.http.get<Event[]>(newURL, { observe: 'response' });

  }


  filter(filters: { [key: string]: string[] }): EventsService {

      const prop = Object.keys(filters);
      const filterFor = prop[0];
    if (filterFor !== undefined) {
      this.apiUrl = this.apiUrl + filterFor + '_like=' + filters[filterFor] + '&';
    }
    return this;
  }

  sort(sort: { by: string, reverse: boolean }): EventsService {
    if (sort) {
      let sortDirection = 'asc';

      if (sort.reverse) { sortDirection = 'asc'; } else { sortDirection = 'desc'; }
      // for(prop in sort) {sortFor = prop}
      this.apiUrl = this.apiUrl + '_sort=' + sort.by + '&_order=' + sortDirection + '&';
    }

    return this;
  }


  fetch(skip: number = 0, limit: number = 10) {

    this.apiUrl = this.apiUrl + '_start=' + skip + '&_limit=' + limit + '&';
    return this;
  }

  deleteEvents(selectedEvents: Event[]) {

    const apiUrl = 'http://localhost:3000/events/';

    return this.http.delete(apiUrl + selectedEvents[0].id);
  }

  /* switchRequest(event: Event) {
    const objPassed = Object.assign({}, event);

    if ( objPassed === <Event>{} ) { return this.createEvent(event); } else { return this.updateEvent(event); }
  } */

  updateEvent(event: Event) {
    const apiUrl = 'http://localhost:3000/events/' + event.id;
    return this.http.put(apiUrl, JSON.stringify(event), httpOptions);
  }

  createEvent(event: Event) {
    const apiUrl = 'http://localhost:3000/events/';
    return this.http.post(apiUrl, JSON.stringify(event), httpOptions);
  }
}
