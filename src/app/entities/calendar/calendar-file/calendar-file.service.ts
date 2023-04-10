import {Injectable} from '@angular/core';
import {CalendarFileComponent} from "./calendar-file.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Calendar} from "../../model/calendar.model";

@Injectable({
  providedIn: 'root'
})
export class CalendarFileService {

  private isOpen = false;
  private instance?: NgbModalRef;

  constructor(private modalService: NgbModal
  ) {
  }

  open(calendars: Calendar[]) {
    const modalRef = this.modalService.open(CalendarFileComponent)
    modalRef.componentInstance.calendars = calendars
  }

  close(): void {
    if (!this.isOpen || !this.instance) return;
    this.instance.dismiss();
  }
}
