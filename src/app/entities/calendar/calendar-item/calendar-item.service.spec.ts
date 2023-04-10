import { TestBed } from '@angular/core/testing';

import { CalendarItemService } from './calendar-item.service';

describe('CalendarItemService', () => {
  let service: CalendarItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
