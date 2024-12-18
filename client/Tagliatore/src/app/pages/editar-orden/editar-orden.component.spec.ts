import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarOrdenComponent } from './editar-orden.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditarOrdenComponent', () => {
  let component: EditarOrdenComponent;
  let fixture: ComponentFixture<EditarOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarOrdenComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
