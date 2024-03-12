import {Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas"
import {FormBuilder, NgForm} from '@angular/forms';
import {CalendarFileService} from "./calendar-file.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Calendar} from "../../model/calendar.model";
import getIconFromPlatform, {getIconFamily, Platform} from "../../enum/platform.enum";
import {IconName} from "@fortawesome/fontawesome-svg-core";
import {IconPrefix} from "@fortawesome/free-solid-svg-icons";
import {CalendarContainer} from "../../model/calendar-container.model";
import {CalendarComponent} from "../calendar.component";

@Component({
  selector: 'app-calendar-file',
  templateUrl: './calendar-file.component.html',
  styleUrls: ['./calendar-file.component.scss']
})
export class CalendarFileComponent {

  @ViewChildren('content1') contentElements!: QueryList<ElementRef>;
  @ViewChild('content2', {static: false}) el2!: ElementRef
  @ViewChild('content3', {static: false}) el3!: ElementRef
  @ViewChild('capa', {static: false}) elCapa!: ElementRef

  calendars!: Calendar[];
  calendarsList?: CalendarContainer[] = [];
  customer!: string;
  date!: string;
  outerEntity!: Calendar[];

  @ViewChild('calendarForm')
  form?: NgForm;

  isLoading = false;
  fullPrice: number = 0;

  constructor(
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {

    this.outerEntity = []

    const maxSize = 7;

    for (let i = 0; i < this.calendars.length; i += maxSize) {
      const subarray = {calendars: this.calendars.slice(i, i + maxSize)} as CalendarContainer;
      // @ts-ignore
      this.calendarsList.push(subarray);
    }
  }

  // generatePdf() {
  //   this.isLoading = true;
  //   html2canvas(this.elCapa.nativeElement, {scale: 1.2}).then((canvasCapa) => {
  //
  //     html2canvas(this.el.nativeElement, {scale: 1.2}).then((canvas) => {
  //         const imgData = canvas.toDataURL(
  //           'image/png');
  //         const imgDataCapa = canvasCapa.toDataURL(
  //           'image/png');
  //         const doc = new jsPDF('l', 'px', [1920, 1080]);
  //
  //
  //
  //         doc.addImage(imgDataCapa, 'PNG', 0, 0, 1920, 1080);
  //         doc.addPage()
  //         doc.addImage(imgData, 'PNG', 0, 0, 1920, 1080);
  //
  //         doc.save('agendamento.pdf');
  //         this.isLoading = false;
  //
  //       }
  //     );
  //   })
  // }

  onGeneratePdf() {
    this.generatePdf(this.contentElements, this.elCapa);
  }

  generatePdf(contentElements: QueryList<ElementRef>, elCapa: ElementRef) {
    this.isLoading = true;
    const doc = new jsPDF('l', 'px', [1920, 1080]);

    html2canvas(elCapa.nativeElement, { scale: 1 }).then((canvasCapa) => {
      const imgDataCapa = canvasCapa.toDataURL('image/png');
      doc.addImage(imgDataCapa, 'PNG', 0, 0, 1920, 1080);
      doc.addPage();

      const scale = 1.2;
      const promises = contentElements.map((contentElement: ElementRef, index: number) => {
        return new Promise<void>((resolve, reject) => {
          const page = contentElement.nativeElement;

          html2canvas(page, { scale }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            doc.addImage(imgData, 'PNG', 0, 0, 1920, 1080);
            if (index !== contentElements.length - 1) {
              doc.addPage();
            }
            resolve();
          }).catch(reject);
        });
      });

      Promise.all(promises).then(() => {
        doc.save('agendamento.pdf');
        this.isLoading = false;
      }).catch((error) => {
        console.error(error);
        this.isLoading = false;
      });
    });
  }


  // teste() {
  //   const doc = new jsPDF('p', 'px', [1200, 1700]);
  //   doc.html(this.el.nativeElement, {
  //     width: 1200,
  //     callback: (pdf) => {
  //       pdf.save("teste.pdf")
  //     }
  //   })
  // }

  close() {
    this.activeModal.close()
  }

  getIcon(platform: Platform): IconName {
    return (getIconFromPlatform(platform) as unknown as IconName);
  }

  getIconFamily(platform: Platform): IconPrefix {
    return (getIconFamily(platform) as unknown as IconPrefix);
  }

}
