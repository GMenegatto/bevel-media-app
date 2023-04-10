import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatePipe, registerLocaleData} from '@angular/common';
import {InvoiceRoutingModule} from './invoice-routing.module';
import {InvoiceComponent} from "./invoice.component";
import {NgbAccordionModule, NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ReactiveFormsModule} from "@angular/forms";
import {InvoiceFileComponent} from "./invoice-file/invoice-file.component";
import {InvoiceItemComponent} from "./invoice-item/invoice-item.component";


import localePt from '@angular/common/locales/pt';
import {CurrencyMaskModule} from "ng2-currency-mask";
import {TranslationService} from "../../service/translation.service";
import {TranslateModule} from "@ngx-translate/core";

registerLocaleData(localePt);


@NgModule({
  declarations: [InvoiceComponent, InvoiceFileComponent, InvoiceItemComponent



  ],
  imports: [
    CommonModule,
    NgbAccordionModule,
    ReactiveFormsModule,
    InvoiceRoutingModule,
    NgbDatepickerModule,
    FontAwesomeModule,
    CurrencyMaskModule,
    TranslateModule
  ],
  providers: [
    TranslationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class InvoiceModule {
}
