import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Event } from './events.model';
import { EventsComponent } from './events.component';
import { element } from 'protractor';
import { Data } from '@angular/router/src/config';

@Component({
    selector: 'app-event',
    templateUrl: 'event.component.html',
    styleUrls: ['event.component.css']
})

export class EventComponent implements OnInit {

    @Output() Save = new EventEmitter();
    @Output() Cancel = new EventEmitter();

    element: any;


    @Input() event: Event;

    constructor() {}

    ngOnInit() {

    this.element = document.getElementById('label');
        this.element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'start'});

    }

    onCancel() {
        this.Cancel.emit();
    }

    onSave() {
        this.Save.emit();
    }

    /* scroll() {
        this.element = document.getElementById('id');
        this.element.scrollIntoView();

    } */
}




