import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPlatilloComponent } from './agregar-platillo.component';

describe('AgregarPlatilloComponent', () => {
  let component: AgregarPlatilloComponent;
  let fixture: ComponentFixture<AgregarPlatilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarPlatilloComponent]
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
