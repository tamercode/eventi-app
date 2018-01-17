import { Data } from '@angular/router/src/config';

export class Event {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    visible: boolean;

    constructor() {
        this.id = null;
        this.name = null;
        this.description = null;
        this.startDate = null;
        this.endDate = null;
        this.location = null;
        this.visible = null;

    }

}
