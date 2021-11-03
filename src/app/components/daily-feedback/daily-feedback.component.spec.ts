import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyFeedbackComponent } from './daily-feedback.component';

describe('DailyFeedbackComponent', () => {
  let component: DailyFeedbackComponent;
  let fixture: ComponentFixture<DailyFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
