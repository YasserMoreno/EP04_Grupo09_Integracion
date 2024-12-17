import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MeseroService } from '../../services/meseroService/mesero.service';
import { Mesero } from '../../interfaces/mesero';

@Component({
  selector: 'app-editar-mesero',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, SidebarComponent, RouterModule, CommonModule, FormsModule],
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
      },
      (error) => {
        console.error('Error al obtener los datos del mesero:', error);
      }
    );
  }

  updateMesero(): void {
    if (this.mesero && this.id) {
      this.meseroService.putMesero(this.id, this.mesero).subscribe(
        () => {
          console.log('Mesero actualizado con éxito');
          this.router.navigate(['/meseros']);  
        },
        (error) => {
          console.error('Error al actualizar el mesero:', error);
        }
      );
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;  // Cambiar el estado de visibilidad
  }

}
