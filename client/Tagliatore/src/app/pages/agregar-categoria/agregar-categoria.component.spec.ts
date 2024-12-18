import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCategoriaComponent } from './agregar-categoria.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgregarCategoriaComponent', () => {
  let component: AgregarCategoriaComponent;
  let fixture: ComponentFixture<AgregarCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarCategoriaComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
