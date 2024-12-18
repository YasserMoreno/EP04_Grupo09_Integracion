import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPlatilloComponent } from './agregar-platillo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgregarPlatilloComponent', () => {
  let component: AgregarPlatilloComponent;
  let fixture: ComponentFixture<AgregarPlatilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarPlatilloComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarPlatilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
