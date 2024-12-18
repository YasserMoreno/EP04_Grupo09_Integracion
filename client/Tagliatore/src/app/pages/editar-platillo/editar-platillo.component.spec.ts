import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPlatilloComponent } from './editar-platillo.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditarPlatilloComponent', () => {
  let component: EditarPlatilloComponent;
  let fixture: ComponentFixture<EditarPlatilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [EditarPlatilloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPlatilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
