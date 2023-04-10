import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {sidebarRoute} from "./entities/sidebar/sidebar.route";

const routes: Routes = []

const LAYOUT_ROUTES = [sidebarRoute];

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: 'invoice',
      loadChildren: () => import('./entities/invoice/invoice.module').then(m => m.InvoiceModule)
    },
    {
      path: 'calendar',
      loadChildren: () => import('./entities/calendar/calendar.module').then(m => m.CalendarModule)
    },
    ...LAYOUT_ROUTES
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
