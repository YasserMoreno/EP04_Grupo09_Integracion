import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { RouterModule } from '@angular/router';
import { MeseroService } from '../../services/meseroService/mesero.service';  // Importar el servicio
import { Mesero } from '../../interfaces/mesero';  // Asegúrate de que la interfaz Mesero esté bien definida
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-mesero',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, SidebarComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './agregar-mesero.component.html',
  styleUrls: ['./agregar-mesero.component.css']
})
export class AgregarMeseroComponent {

  mesero: Mesero = {
    _id: '',
    nombre: '',
    correo: '',
    telefono: '',
    usuario: '',
    password: '',
    activo: true
  };

  passwordVisible: boolean = false; 

  constructor(private meseroService: MeseroService, private router: Router) {}

  // Método que se ejecuta cuando se envía el formulario
  agregarMesero(): void {
    this.meseroService.postMesero(this.mesero).subscribe(
      (response) => {
        console.log('Mesero agregado con éxito', response);
        // Redirigir a otra página después de agregar el mesero
        this.router.navigate(['/meseros']);
      },
      (error) => {
        console.error('Error al agregar el mesero:', error);
      }
    );
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;  // Cambiar el estado de visibilidad
  }
}
