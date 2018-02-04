import { Component, OnInit, DoCheck, AfterViewInit, OnChanges, SimpleChange, Input } from '@angular/core';
import { Event } from './events.model';
import { EventsService } from './events.service';
import { Subject } from 'rxjs/Subject';
import { Body } from '@angular/http/src/body';
import { element } from 'protractor';
import { ClrDatagridStateInterface, ClrDatagrid } from '@clr/angular';
import { Output } from '@angular/core/src/metadata/directives';
import { EventComponent } from './event.componet';
import { HttpClient } from '@angular/common/http/src/client';





@Component({
    moduleId: module.id,
    selector: 'app-events',
    templateUrl: 'events.component.html',
    styleUrls: ['events.component.css'],
    providers: [EventsService]
})

export class EventsComponent {

    eventsList: Event[];
    selected: Event[] = [];
    loading = true;
    total: number;
    state: ClrDatagridStateInterface;


    constructor(private service: EventsService) { }


    refresh(state: ClrDatagridStateInterface) {
        this.state = state;
        this.loading = true;
        const filters: { [prop: string]: any[] } = {};
        if (state.filters) {
            for (const filter of state.filters) {
                const { property, value } = <{ property: string, value: string }>filter;
                filters[property] = [value];
            }
        }
        this.service.filter(filters)
        .sort(<{ by: string, reverse: boolean }>state.sort)
        .fetch(state.page.from, state.page.size)
        .sendRequest().subscribe(arg => {this.eventsList = arg.body; this.total = parseInt(arg.headers.get('X-Total-Count'), 10); });
    }

    onDelete() {

        this.service.deleteEvents(this.selected).subscribe(() => {
            this.selected.splice(0, 1);
            if (this.selected.length > 0) {
                this.onDelete();
            }else {
                this.refresh(this.state);
              } });

    }

}



