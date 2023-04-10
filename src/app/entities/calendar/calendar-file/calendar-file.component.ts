import {Component, ElementRef, ViewChild} from '@angular/core';
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas"
import {FormBuilder, NgForm} from '@angular/forms';
import {CalendarFileService} from "./calendar-file.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Calendar} from "../../model/calendar.model";

@Component({
  selector: 'app-calendar-file',
  templateUrl: './calendar-file.component.html',
  styleUrls: ['./calendar-file.component.scss']
})
export class CalendarFileComponent {

  @ViewChild('content', {static: false}) el!: ElementRef
  @ViewChild('asd', {static: false}) el2!: ElementRef

  calendars!: Calendar[];
  outerEntity!: Calendar[];

  @ViewChild('calendarForm')
  form?: NgForm;

  isLoading = false;
  fullPrice: number = 0;

  constructor(
    private fb: FormBuilder,
    private calendarFileService: CalendarFileService,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {

    this.outerEntity = []
  }


  teste2() {
    html2canvas(this.el.nativeElement).then(function (canvas) {
      canvas.id = "asd"
      document.body.appendChild(canvas);
    });
  }

  generatePdf() {
    this.isLoading = true;
    html2canvas(this.el.nativeElement, {scale: 1.2}).then((canvas) => {
        const imgData = canvas.toDataURL(
          'image/png');
        const doc = new jsPDF('p', 'px', [1200, 1700]);
        doc.addImage(imgData, 'PNG', 0, 0, 1200, 1700);
        doc.save('recibo.pdf');
        this.isLoading = false;

      }
    );
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

  close() {
    this.activeModal.close()
  }
}
