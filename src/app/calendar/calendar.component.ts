import { Component, OnInit, Input} from '@angular/core';
import { EventsService } from '../events/events.service';
import { Day } from './day.model';
import { addZero, formatDateToStr, literalDate } from '../utils';
import { Event } from '../events/events.model';





@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [EventsService]
})
export class CalendarComponent implements OnInit {


  date = new Date(); // data corrente
  dateStart: Date;   // data inizio mese
  eventList: any;
  currentMont: string; // mese corrente in lettere
  currentYear: string;
  basic = false;
  daySelected: Day;
  daySelectedDateToStr: string;
  eventSelectedDateToStr: string;
  lg = 'lg';
  eventSelected: Event;
  flagAddButtonModal = false;
  flagDayEmptyClick = false;
  modalTitle: string;

  edit = false;
  prospettoEventi = false;

  mese: Day[] = [];
  daysOfM = parseInt(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate().toString(), 0);
  days = new Array();
  numEve = new Array();
  arrayAssoc = new Array();


  constructor(private service: EventsService) { }

  ngOnInit() {
    this.currentMont = literalDate(this.date)['month'];
    this.currentYear = literalDate(this.date)['year'];
    console.log(this.currentMont);

    this.takeEventOfMonth();

  }

  takeEventOfMonth() {

    const correntDateStr = formatDateToStr(this.date); // data corrente formattata e convertita in stringa
    const year = correntDateStr.slice(0, 4);
    const month = correntDateStr.slice(5, 7);
    this.dateStart = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 0); // data di inizio mese
    const url = 'http://localhost:3000/events?startDate_like=' + year + '-' + month;

    this.service.sendRequestUrl(url).subscribe(resp => {
    this.eventList = resp.body; console.log(this.eventList);

      this.currentMont = literalDate(this.date)['month'];
      this.currentYear = literalDate(this.date)['year'];
      // crea i giorni necessari per riempire il mese

      for (let i = 1; i <= this.daysOfM; i++) {

        const _dateStart = new Date((this.dateStart.getTime() + (1000 * 60 * 60 * 24) * i)); // aggiunge 1 giorno alla data di inizio mese
        const day = new Day(_dateStart); // crea il giorno con la data incrementata
        this.mese[i - 1] = day; // inserisce il giorno nel mese
      }

      for (let e = 1; e <= this.mese.length; e++) {
        for (let a = 1; a <= this.eventList.length; a++) {
          const dayDateStr = formatDateToStr(this.mese[e - 1].date);
          if (dayDateStr === this.eventList[a - 1].startDate) {
            this.mese[e - 1].addEvent(this.eventList[a - 1]);
          }
        }
      }
    });

  }

  nextMonth() {

    this.date.setMonth(this.date.getMonth() + 1);
    this.takeEventOfMonth();
  }

  prevMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
    this.takeEventOfMonth();

  }

  showEditModal() { this.edit = true; }

  showProspettoModal() { this.prospettoEventi = true; }

  hideEditModal() {
    this.edit = false;
    console.log('num eventi ' + this.flagDayEmptyClick);

    console.log('flag add ' + this.flagAddButtonModal);


    if (this.flagDayEmptyClick) { this.daySelected.events.pop(); }
    if (this.flagAddButtonModal) { this.daySelected.events.pop(); }

    this.flagAddButtonModal = false;
    this.flagDayEmptyClick = false;
    this.closeModal();
  }

  hideProspettoModal() { this.prospettoEventi = false; }

  cancelProspettoModal() {this.hideProspettoModal(); this.closeModal(); }

  addEventProspettoModal() {
    this.hideProspettoModal();
    this.flagAddButtonModal = true;
    this.setFullDay(this.daySelected);
    this.showEditModal();
  }

  setFullDay(day: Day) {
    const event = new Event();
    event.setStartDate(formatDateToStr(day.date));
    day.addEvent(event);
    this.daySelected = day;
    this.eventSelected = day.events[day.events.length - 1]; console.log('test eventi ' + this.daySelected.events.length); }



  setEmptyDay(day: Day) {

    if (day.events.length === 0) {
      const event = new Event();
      event.setStartDate(formatDateToStr(day.date));
      console.log('test  ' + event.startDate);
      day.addEvent(event);
      this.daySelected = day;
      this.eventSelected = day.events[0];
    }
  }

  selectModal(day: Day) {

    console.log(day);


    if (day.events.length > 0) {
      this.daySelected = day;
      this.showProspettoModal();  // mostra modale con prospetto eventi
    } else {
      this.flagDayEmptyClick = true;
      this.setEmptyDay(day);
      this.showEditModal();
    }  // mostra modale per la creazione evento


    this.openModal();
  }

  editEvent(event: Event) {
    this.hideProspettoModal();
    this.eventSelected = event;
    this.showEditModal();
  }

  closeModal() { this.basic = false; }
  openModal() {
    this.basic = true;
    this.modalTitle = literalDate(this.daySelected.date)['week'] + literalDate(this.daySelected.date)['day'] +
                      literalDate(this.daySelected.date)['month'] + literalDate(this.daySelected.date)['year']; }

}
