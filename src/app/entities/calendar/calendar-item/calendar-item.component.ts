import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, NgForm} from '@angular/forms';
import {CalendarItemService} from "./calendar-item.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Calendar} from "../../model/calendar.model";
import getIconFromPlatform, {allPlatforms, getIconFamily, Platform} from "../../enum/platform.enum";
import {Icon, IconName} from "@fortawesome/fontawesome-svg-core";
import {IconPrefix} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss']
})
export class CalendarItemComponent {

  @ViewChild('content', {static: false}) el!: ElementRef
  @ViewChild('asd', {static: false}) el2!: ElementRef

  platforms: Platform[] = allPlatforms()

  formats: string[] = ['Feed', 'Reel', 'Story', 'Vídeo', 'Post blog', 'Carrossel', 'Imagem']
  pilars: string[] = ['Institucional', 'Educacional', 'Promocional', 'Prova Social', 'Conexão', 'Inspiração', 'Entretenimento', 'Portfólio']

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
    if (this.calendar) {
      this.editForm.get(['date'])?.setValue(this.calendar.date)
      this.editForm.get(['pilar'])?.setValue(this.calendar.pilar)
      this.editForm.get(['content'])?.setValue(this.calendar.content)
      this.editForm.get(['platform'])?.setValue(this.calendar.platform)
      this.editForm.get(['pilar'])?.setValue(this.calendar.pilar)
      this.editForm.get(['format'])?.setValue(this.calendar.format)
      this.editForm.get(['ads'])?.setValue(this.calendar.ads)
    }
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

  getIconFamily(platform: Platform): IconPrefix {
    return (getIconFamily(platform) as unknown as IconPrefix);
  }

  onConfirmClicked(): void {

  }
}
