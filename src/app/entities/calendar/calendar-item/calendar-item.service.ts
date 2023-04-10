import {Injectable} from '@angular/core';
import {CalendarItemComponent} from "./calendar-item.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Calendar} from "../../model/calendar.model";
import {CalendarModule} from "../calendar.module";

@Injectable({
  providedIn: 'root'
})
export class CalendarItemService {

  private isOpen = false;
  private instance?: NgbModalRef;

  constructor(private modalService: NgbModal
  ) {
  }

  open(calendar?: Calendar, confirm?: Function) {
    this.instance = this.modalService.open(CalendarItemComponent)
    this.instance.componentInstance.calendar = calendar
    this.instance.componentInstance.confirm = confirm
  }

  confirm(): void {
    if (!this.isOpen || !this.instance) return;
    this.instance.close();
  }

  close(): void {
    if (!this.isOpen || !this.instance) return;
    this.instance.dismiss();
  }
}
