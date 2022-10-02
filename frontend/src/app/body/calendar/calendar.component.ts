import {Component, OnInit} from '@angular/core';
import {CalendarDayModel} from "./CalendarDay.model";
import {HttpClient} from "@angular/common/http";
import {CalendarService} from "./calendar.service";

@Component({
  selector: 'app-calendar', templateUrl: './calendar.component.html', styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  public calendar: CalendarDayModel[] = [];
  public monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  public displayMonth!: string;
  private monthIndex: number = 0;
  constructor(private serv: CalendarService) {
  }

  ngOnInit(): void {
    this.generateCalendarDays(this.monthIndex);
  }

  public increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
  }

  public decreaseMonth() {
    this.monthIndex--
    this.generateCalendarDays(this.monthIndex);
  }

  public setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }

  private generateCalendarDays(monthIndex: number): void {
    // we reset our calendar
    this.calendar = [];

    // we set the date
    let day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));

    // set the dispaly month for UI
    this.displayMonth = this.monthNames[day.getMonth()];

    let startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;

    for (var i = 0; i < 42; i++) {
      this.calendar.push(new CalendarDayModel(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }

  private getStartDateForCalendar(selectedDate: Date) {
    // for the day we selected let's get the previous month last day
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));

    // start by setting the starting date of the calendar same as the last day of previous month
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    // but since we actually want to find the last Monday of previous month
    // we will start going back in days intil we encounter our last Monday of previous month
    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
      } while (startingDateOfCalendar.getDay() != 1);
    }

    return startingDateOfCalendar;
  }

  dayClick($event: CalendarDayModel) {
    if($event.dayEvent == undefined)
      $event.dayEvent = new Date()
    else
      $event.dayEvent = undefined
    console.log($event)
  }
}
