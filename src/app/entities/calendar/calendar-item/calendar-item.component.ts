import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, NgForm} from '@angular/forms';
import {CalendarItemService} from "./calendar-item.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Calendar} from "../../model/calendar.model";
import getIconFromPlatform, {Platform} from "../../enum/platform.enum";
import {Icon, IconName} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss']
})
export class CalendarItemComponent {

  @ViewChild('content', {static: false}) el!: ElementRef
  @ViewChild('asd', {static: false}) el2!: ElementRef

  platforms: Platform[] = [Platform.YOUTUBE, Platform.FACEBOOK, Platform.INSTAGRAM]

  editForm = this.fb.group({
    date: [''],
    pilar: [''],
    content: [''],
    platform: [''],
    format: [''],
    ads: [''],
  });

  confirm?: Function;
  calendar?: Calendar;


  @ViewChild('calendarForm')
  form?: NgForm;

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public calendarItemService: CalendarItemService
  ) {
  }

  ngOnInit() {

  }

  close() {
    this.activeModal.close()
  }

  addItem() {
    this.calendar = new Calendar()
    this.calendar.date = this.editForm.get(['date'])!.value
    this.calendar.pilar = this.editForm.get(['pilar'])!.value
    this.calendar.content = this.editForm.get(['content'])!.value
    this.calendar.platform = this.editForm.get(['platform'])!.value
    this.calendar.format = this.editForm.get(['format'])!.value
    this.calendar.ads = this.editForm.get(['ads'])!.value

    this.confirm && this.confirm(this.calendar);
    this.calendarItemService.confirm();
    this.activeModal.close()

  }

  getIcon(platform: Platform): IconName {
    return (getIconFromPlatform(platform) as unknown as IconName);
  }

  onConfirmClicked(): void {

  }
}
