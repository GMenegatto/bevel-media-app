import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SidebarComponent} from "./entities/sidebar/sidebar.component";
import {InvoiceModule} from "./entities/invoice/invoice.module";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {ReactiveFormsModule} from "@angular/forms";
import { CurrencyMaskModule } from 'ng2-currency-mask';
import {CalendarModule} from "./entities/calendar/calendar.module";

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {TranslationService} from "./service/translation.service";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    CurrencyMaskModule,
    InvoiceModule,
    CalendarModule,
    NgbModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [TranslationService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconLibrary: FaIconLibrary) {
    // @ts-ignore
    iconLibrary.addIconPacks(fas, fab);
    // iconLibrary.addIconPacks(fab);
  }
}

