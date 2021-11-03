import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankProductComponent } from './tank-product.component';

describe('TankProductComponent', () => {
  let component: TankProductComponent;
  let fixture: ComponentFixture<TankProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TankProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TankProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
