import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCategoriaComponent } from './editar-categoria.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditarCategoriaComponent', () => {
  let component: EditarCategoriaComponent;
  let fixture: ComponentFixture<EditarCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarCategoriaComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
