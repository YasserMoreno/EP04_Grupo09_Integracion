import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeserosComponent } from './meseros.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MeserosComponent', () => {
  let component: MeserosComponent;
  let fixture: ComponentFixture<MeserosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeserosComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeserosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
