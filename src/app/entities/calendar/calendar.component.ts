import {Component, ElementRef, ViewChild} from '@angular/core';
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas"
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {CalendarFileService} from "./calendar-file/calendar-file.service";
import {Calendar} from "../model/calendar.model";
import {CalendarItemService} from "./calendar-item/calendar-item.service";
import {InvoiceItem} from "../model/invoice-item.model";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  @ViewChild('content', {static: false}) el!: ElementRef
  @ViewChild('asd', {static: false}) el2!: ElementRef

  editForm = this.fb.group({
    customer: ['', [Validators.required, Validators.maxLength(100)]],
    calendarNumber: ['', [Validators.required, Validators.maxLength(100)]],
    date: [''],
    paymentDate: [''],
    address: [''],
    destination: [''],
    paymentObs: [''],
    paymentMethod: [''],
    installment: ['']
  });

  calendars!: Calendar[];

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

  teste2() {
    html2canvas(this.el.nativeElement).then(function (canvas) {
      canvas.id = "asd"
      document.body.appendChild(canvas);
    });
  }

  teste3() {
    html2canvas(this.el.nativeElement, {scale: 1.2}).then(function (canvas) {
      const imgData = canvas.toDataURL(
        'image/png');
      const doc = new jsPDF('p', 'px', [1200, 1700]);
      doc.addImage(imgData, 'PNG', 0, 0, 1200, 1700);
      doc.save('recibo.pdf');
    });
  }

  teste() {
    const doc = new jsPDF('p', 'px', [1200, 1700]);
    doc.html(this.el.nativeElement, {
      width: 1200,
      callback: (pdf) => {
        pdf.save("teste.pdf")
      }
    })
  }

  openCalendar() {
    this.calendarFileService.open(this.calendars)
  }

  addItem() {
    this.calendarItemService.open(undefined, (calendar: Calendar) => {
      this.calendars.push(calendar);
    })
  }

  edit(item: Calendar) {

    const oldItem = this.calendars!.find(cd => cd.content === item.content);

    this.calendarItemService.open(item, (newItem: Calendar) => {
      this.calendars![this.calendars!.indexOf(oldItem || new Calendar())] = {
        ...newItem
      } as Calendar
    })
  }

  delete(item: Calendar) {

    const oldItem = this.calendars!.find(cd => cd.content === item.content) || new Calendar();

    this.calendars = this.calendars!.filter(cd => cd.content !== oldItem.content);

  }


}
