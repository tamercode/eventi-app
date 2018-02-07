import { Component, OnInit, DoCheck, AfterViewInit, OnChanges, SimpleChange, Input } from '@angular/core';
import { Event } from './events.model';
import { EventsService } from './events.service';
import { ClrDatagridStateInterface, ClrDatagrid } from '@clr/angular';
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
    copySelectedEvent: Event;
    loading = true;
    total: number;
    state: ClrDatagridStateInterface;
    formVisible: boolean;
    createFLag: boolean;


    constructor(private service: EventsService) {}


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

        this.selected.splice(0, this.selected.length);
    }

    delete() {

        this.service.deleteEvents(this.selected).subscribe(() => {
            this.selected.splice(0, 1);
            if (this.selected.length > 0) {
                this.delete();
            }else {
                this.refresh(this.state);
              } });

    }

    edit() {
        this.createFLag = false;
        this.copySelectedEvent = this.selected[0];
        this.showForm();
    }

    create() {
        const event = new Event;
        this.copySelectedEvent = event;
        this.createFLag = true;
        this.showForm();
    }

    save() {

        if ( this.createFLag ) {
            console.log(this.copySelectedEvent); 
            this.service.createEvent(this.copySelectedEvent).subscribe(arg => {this.refresh(this.state); this.hideForm(); } ) ;
        } else { this.service.updateEvent(this.selected[0]).subscribe(arg => {this.refresh(this.state);
                                                                              this.hideForm(); this.selected.splice(0, 1); } ) ; }
    }

    showForm() { this.formVisible = true; }
    hideForm() { this.formVisible = false; }

}



