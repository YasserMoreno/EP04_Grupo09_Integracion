import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMeseroComponent } from './editar-mesero.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditarMeseroComponent', () => {
  let component: EditarMeseroComponent;
  let fixture: ComponentFixture<EditarMeseroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMeseroComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarMeseroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
