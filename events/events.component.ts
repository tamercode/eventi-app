import { Component, OnInit, DoCheck, AfterViewInit, OnChanges, SimpleChange, Input } from '@angular/core';
import { Event } from './events.model';
import {EventsService} from './events.service';
import { Subject } from 'rxjs/Subject';
import { Body } from '@angular/http/src/body';
import { element } from 'protractor';
import {ClrDatagridStateInterface, ClrDatagrid} from '@clr/angular';
import { Output } from '@angular/core/src/metadata/directives';





@Component({
    moduleId: module.id,
    selector: 'app-events',
    templateUrl: 'events.component.html',
    styleUrls: ['events.component.css'],
    providers: [EventsService]
})

export class EventsComponent implements OnInit, OnChanges {

    eventsList: Event[];
    eventsListSort: Event[];
    formVisible: boolean;
    selectedEvent: Event;
    createFlag: boolean;
    loading = true;
    currentPage: any;
    total: number;
    flag: boolean;








    constructor(private service: EventsService) {
        this.formVisible = false;
        this.eventsList = [];
        // this.total = 0;
        // this.currentPage = 0;
    }


    ngOnInit() {

    }
    ngOnChanges() {

    }

     showForm() {
        this.formVisible = true;
    }

    hideForm() {
        this.formVisible = false;
    }

    create() {
        this.createFlag = true;
        this.selectedEvent = new Event();
        this.showForm();
    }

    edit(event: Event) {
        this.createFlag = false;
        this.selectedEvent = event;
        this.showForm();
    }

    /* delete(event: Event) {
        this.service.deteteEvent(event).subscribe(() => this.loadEvents().hideForm());
    }

    save() {
        this.service.save(this.selectedEvent, this.createFlag).subscribe(() => this.loadEvents().hideForm());
    } */

    loadEvents(state: ClrDatagridStateInterface ) {
        console.log(state);

        this.service.loadEvents(state, this.currentPage).subscribe(arg => this.loadArray(arg));

        return this;
    }

    loadArray(arg) {

      this.eventsList = arg.body;
      this.total = <number>arg.headers.get('X-Total-Count');
      console.log (this.eventsList);
      console.log (this.total);

    }

    prova() {
        let x = document.getElementsByTagName('clr-dg-pagination');
        console.log(x.item(100));
    }

}



