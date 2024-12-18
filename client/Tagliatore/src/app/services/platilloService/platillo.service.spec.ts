import { TestBed } from '@angular/core/testing';

import { PlatilloService } from './platillo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PlatilloService', () => {
  let service: PlatilloService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PlatilloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
