import {Component, ElementRef, ViewChild} from '@angular/core';
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas"
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {CalendarFileService} from "./calendar-file/calendar-file.service";
import {Calendar} from "../model/calendar.model";
import {CalendarItemService} from "./calendar-item/calendar-item.service";
import getIconFromPlatform, {getIconFamily, Platform} from "../enum/platform.enum";
import {IconName} from "@fortawesome/fontawesome-svg-core";
import {IconPrefix} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  @ViewChild('content', {static: false}) el!: ElementRef
  @ViewChild('asd', {static: false}) el2!: ElementRef

  editForm = this.fb.group({
    date: [''],
    customer: ['']
  });

  calendars: Calendar[] = [];

  @ViewChild('calendarForm')
  form?: NgForm;

  constructor(
    private fb: FormBuilder,
    private calendarFileService: CalendarFileService,
    private calendarItemService: CalendarItemService,
  ) {
  }

  ngOnInit() {
    this.calendars = []
  }

  openCalendar() {
    const customer = this.editForm.get(['customer'])!.value
    const date = this.editForm.get(['date'])!.value
    this.calendarFileService.open(this.calendars, customer, date)
  }

  addItem() {
    this.calendarItemService.open(undefined, (calendar: Calendar) => {
        calendar.id = (this.calendars?.length + 1)
        this.calendars.push(calendar);
    })
  }

  edit(item: Calendar) {

    const oldItem = this.calendars!.find(cd => cd.id === item.id);

    this.calendarItemService.open(item, (newItem: Calendar) => {
      this.calendars![this.calendars!.indexOf(oldItem || new Calendar())] = {
        ...newItem
      } as Calendar
    })
  }

  delete(item: Calendar) {

    const oldItem = this.calendars!.find(cd => cd.id === item.id) || new Calendar();

    this.calendars = this.calendars!.filter(cd => cd.id !== oldItem.id);

  }

  getIcon(platform: Platform): IconName {
    return (getIconFromPlatform(platform) as unknown as IconName);
  }

  getIconFamily(platform: Platform): IconPrefix {
    return (getIconFamily(platform) as unknown as IconPrefix);
  }

}
