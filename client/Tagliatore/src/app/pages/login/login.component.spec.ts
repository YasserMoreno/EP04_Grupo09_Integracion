import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginService } from '../../services/loginService/login.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let componente: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let servicioLoginMock: jasmine.SpyObj<LoginService>;

  beforeEach(async () => {
    // Creamos un mock para el servicio LoginService
    servicioLoginMock = jasmine.createSpyObj('LoginService', ['login']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: LoginService, useValue: servicioLoginMock }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();

    // Mock de localStorage
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.returnValue('fake_token'); // Simula que ya existe un token
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería alternar la visibilidad de la contraseña', () => {
    expect(componente.passwordFieldType).toBe('password');
    componente.togglePasswordVisibility();
    expect(componente.passwordFieldType).toBe('text');
    componente.togglePasswordVisibility();
    expect(componente.passwordFieldType).toBe('password');
  });

  it('debería llamar al servicio loginService.login y almacenar el token en localStorage', () => {
    const respuestaMock = { token: 'fake_token' };
    servicioLoginMock.login.and.returnValue(of(respuestaMock));

    componente.usuario = 'juangomez';
    componente.password = 'isil123';
    componente.onLogin();

    // Verifica que el servicio se haya llamado con los valores correctos
    expect(servicioLoginMock.login).toHaveBeenCalledWith('juangomez', 'isil123');
    // Verifica que el token haya sido guardado en localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fake_token');
    // Verifica la redirección (simulada, ya que estamos en pruebas)
    expect(componente['router'].navigate).toHaveBeenCalledWith(['/intranet']);
  });

  it('debería mostrar un mensaje de error cuando el login falle', () => {
    const errorMock = { error: { message: 'Credenciales incorrectas' } };
    servicioLoginMock.login.and.returnValue(throwError(errorMock));

    componente.usuario = 'juangomez';
    componente.password = 'isil124';
    componente.onLogin();

    expect(componente.errorMessage).toBe('Credenciales incorrectas');
  });

  it('debería manejar errores inesperados durante el login', () => {
    const errorMock = { error: null };
    servicioLoginMock.login.and.returnValue(throwError(errorMock));

    componente.usuario = 'testUser';
    componente.password = 'testPass';
    componente.onLogin();

    expect(componente.errorMessage).toBe('Ocurrió un error inesperado.');
  });
});
