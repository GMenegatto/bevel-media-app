import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'dm-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['sidebar.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  inProduction?: boolean;

  private sidebarVisibility = true;

  menuCollapse: any = {
    administration: false,
    profile: true,
    owners: true,
    clients: true,
    mobileApp: true,
    form: true,
    learning: true
  };

  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }
}
