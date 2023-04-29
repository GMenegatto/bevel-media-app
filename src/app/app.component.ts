import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Invoice} from "./entities/model/invoice.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bevel-media-app';
  constructor(private translate: TranslateService, private store: AngularFirestore) {
    translate.setDefaultLang('pt');
    translate.use('pt');
  }

  invoice = this.store.collection('invoice').valueChanges({ idField: 'id' }) as Observable<Invoice[]>;

}
