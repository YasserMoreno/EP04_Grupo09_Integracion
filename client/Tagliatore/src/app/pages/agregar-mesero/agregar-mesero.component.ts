import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { RouterModule } from '@angular/router';
import { MeseroService } from '../../services/meseroService/mesero.service'; 
import { Mesero } from '../../interfaces/mesero';  
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

  agregarMesero(): void {
    this.meseroService.postMesero(this.mesero).subscribe(
      (response) => {
        console.log('Mesero agregado con éxito', response);
        this.router.navigate(['/meseros']);
      },
      (error) => {
        console.error('Error al agregar el mesero:', error);
      }
    );
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;  
  }
}
