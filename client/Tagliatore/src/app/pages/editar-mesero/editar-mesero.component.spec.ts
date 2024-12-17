import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMeseroComponent } from './editar-mesero.component';

describe('EditarMeseroComponent', () => {
  let component: EditarMeseroComponent;
  let fixture: ComponentFixture<EditarMeseroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMeseroComponent]
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
