import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyFeedbacksApprobationsComponent } from './daily-feedbacks-approbations.component';

describe('DailyFeedbacksApprobationsComponent', () => {
  let component: DailyFeedbacksApprobationsComponent;
  let fixture: ComponentFixture<DailyFeedbacksApprobationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyFeedbacksApprobationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyFeedbacksApprobationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
