import { TestBed } from '@angular/core/testing';

import { OrdenService } from './orden.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OrdenService', () => {
  let service: OrdenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(OrdenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
