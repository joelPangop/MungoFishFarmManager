import { TestBed } from '@angular/core/testing';

import { DailyFeedbackService } from './daily-feedback.service';

describe('DailyFeedbackService', () => {
  let service: DailyFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
