import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntranetComponent } from './intranet.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

describe('IntranetComponent', () => {
  let component: IntranetComponent;
  let fixture: ComponentFixture<IntranetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntranetComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntranetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
