import { Component } from '@angular/core';
import { LoginService } from '../../services/loginService/login.service';  // Asegúrate de importar el servicio
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

  constructor(private loginService: LoginService) { }

  onLogin(): void {
    this.loading = true;
    this.loginService.login(this.usuario, this.password).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Login exitoso:', response);
        window.location.href = '/intranet';
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Ocurrió un error en el login.';
        console.error('Error al iniciar sesión:', error);
      }
    });
  }
}
