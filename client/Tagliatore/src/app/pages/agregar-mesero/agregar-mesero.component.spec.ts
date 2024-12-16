import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMeseroComponent } from './agregar-mesero.component';

describe('AgregarMeseroComponent', () => {
  let component: AgregarMeseroComponent;
  let fixture: ComponentFixture<AgregarMeseroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarMeseroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarMeseroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
