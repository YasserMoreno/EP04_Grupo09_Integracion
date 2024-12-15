import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillosComponent } from './plantillos.component';

describe('PlantillosComponent', () => {
  let component: PlantillosComponent;
  let fixture: ComponentFixture<PlantillosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantillosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlantillosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
