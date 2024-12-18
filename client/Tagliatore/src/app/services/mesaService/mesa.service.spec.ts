import { TestBed } from '@angular/core/testing';

import { MesaService } from './mesa.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MesaService', () => {
  let service: MesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
