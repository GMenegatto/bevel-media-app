import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatePipe, registerLocaleData} from '@angular/common';
import {CalendarRoutingModule} from './calendar-routing.module';
import {CalendarComponent} from "./calendar.component";
import {NgbAccordionModule, NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ReactiveFormsModule} from "@angular/forms";
import {CalendarFileComponent} from "./calendar-file/calendar-file.component";
import {CalendarItemComponent} from "./calendar-item/calendar-item.component";


import localePt from '@angular/common/locales/pt';
import {CurrencyMaskModule} from "ng2-currency-mask";
import {NgSelectModule} from "@ng-select/ng-select";

registerLocaleData(localePt);


@NgModule({
  declarations: [CalendarComponent, CalendarFileComponent, CalendarItemComponent



  ],
  imports: [
    CommonModule,
    NgbAccordionModule,
    ReactiveFormsModule,
    CalendarRoutingModule,
    NgbDatepickerModule,
    FontAwesomeModule,
    CurrencyMaskModule,
    NgSelectModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CalendarModule {
}
