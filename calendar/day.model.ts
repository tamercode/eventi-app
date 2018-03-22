import { Event } from '../events/events.model';



export class Day {
    date: Date;
    events: Event[];

    constructor(date: Date) {
        this.date = date;
        this.events = [];

    }

    addEvent(event: Event) {
        this.events.push(event);
    }

}
