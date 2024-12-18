import { Component } from '@angular/core';
import { LoginService } from '../../services/loginService/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;
  passwordFieldType: string = 'password';

  constructor(private loginService: LoginService) { }

  onLogin(): void {
    this.loading = true;
    this.loginService.login(this.usuario, this.password).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Login exitoso:', response);
        if (response.token) {
          window.location.href = '/intranet';
        } else if (response.error) {
          this.errorMessage = response.error; 
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Ocurrió un error inesperado.';
        console.error('Error al iniciar sesión:', error);
      }
    });
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
