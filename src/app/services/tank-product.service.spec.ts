import { TestBed } from '@angular/core/testing';

import { TankProductService } from './tank-product.service';

describe('TankProductService', () => {
  let service: TankProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TankProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
