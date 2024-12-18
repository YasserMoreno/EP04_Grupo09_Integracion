import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarClienteComponent } from './agregar-cliente.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

describe('AgregarClienteComponent', () => {
  let component: AgregarClienteComponent;
  let fixture: ComponentFixture<AgregarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarClienteComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
