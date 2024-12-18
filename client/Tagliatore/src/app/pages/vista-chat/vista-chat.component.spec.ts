import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaChatComponent } from './vista-chat.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VistaChatComponent', () => {
  let component: VistaChatComponent;
  let fixture: ComponentFixture<VistaChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaChatComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
