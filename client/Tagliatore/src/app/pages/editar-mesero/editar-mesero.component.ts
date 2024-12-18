import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MeseroService } from '../../services/meseroService/mesero.service';
import { Mesero } from '../../interfaces/mesero';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-editar-mesero',
  standalone: true,
  imports: [FormsModule, CommonModule, FooterComponent, HeaderComponent, SidebarComponent, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './editar-mesero.component.html',
  styleUrls: ['./editar-mesero.component.css']
})
export class EditarMeseroComponent implements OnInit {

  mesero: Mesero = {
    _id: '',
    nombre: '',
    correo: '',
    telefono: '',
    usuario: '',
    password: '', 
    activo: true
  };

  id: string | null = null;
  passwordVisible: boolean = false; 
  actualizarPassword: boolean = false;

  constructor(
    private meseroService: MeseroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getMesero(this.id);
    }
  }

  getMesero(id: string): void {
    this.meseroService.getMeseroById(id).subscribe(
      (data) => {
        this.mesero = data;
        this.mesero.password = ''; 
      },
      (error) => {
        console.error('Error al obtener los datos del mesero:', error);
      }
    );
  }

  updateMesero(): void {
    const meseroActualizado = { ...this.mesero }; 

    if (!this.actualizarPassword) {
      delete meseroActualizado.password;
    }

    this.meseroService.putMesero(this.id!, meseroActualizado).subscribe(
      () => {
        console.log('Mesero actualizado con éxito');
        this.router.navigate(['/meseros']); 
      },
      (error) => {
        console.error('Error al actualizar el mesero:', error);
      }
    );
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
