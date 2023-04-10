import { TestBed } from '@angular/core/testing';

import { CalendarFileService } from './calendar-file.service';

describe('CalendarFileService', () => {
  let service: CalendarFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
