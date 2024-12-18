import { TestBed } from '@angular/core/testing';

import { MeseroService } from './mesero.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MeseroService', () => {
  let service: MeseroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MeseroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
