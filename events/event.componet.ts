import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Event } from './events.model';
import { EventsComponent } from './events.component';
import { element } from 'protractor';

@Component({
    selector: 'app-event',
    templateUrl: 'event.component.html'
})

export class EventComponent implements OnInit {

    @Output() onSave = new EventEmitter();
    @Output() onCancel = new EventEmitter();
    element: any;

    @Input()
    event: Event;



    constructor() {}

    ngOnInit() { this.scroll(); }

    cancel() {
        this.onCancel.emit();
    }

    save() {
        this.onSave.emit();
    }

    scroll() {
        this.element = document.getElementById('id');
        this.element.scrollIntoView();

    }
}




