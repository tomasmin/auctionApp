import { TestBed } from '@angular/core/testing';

import { TimeService } from './time.service';

describe('TimeService', () => {
  let service: TimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getTimerValue should return formatted timer object', () => {
    let timerValueObject = service.getTimerValue(2644181792);
    expect(Object.keys(timerValueObject)).toContain('timeLeft');
    expect(Object.keys(timerValueObject)).toContain('timeLeftFormatted');
    expect(timerValueObject.timeLeft).toBeInstanceOf(Number);
    expect(timerValueObject.timeLeftFormatted).toBeInstanceOf(String);
    expect(timerValueObject.timeLeftFormatted.length).toBe(5);
  });
});
