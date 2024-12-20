import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { MeseroService } from '../../services/meseroService/mesero.service';
import { Mesero } from '../../interfaces/mesero';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meseros',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, FooterComponent, RouterModule, CommonModule],
  templateUrl: './meseros.component.html',
  styleUrls: ['./meseros.component.css']
})
export class MeserosComponent implements OnInit {

  meseros: Mesero[] = []; 

  constructor(private meseroService: MeseroService) { }

  ngOnInit(): void {
    this.getMeseros();
  }

  getMeseros(): void {
    this.meseroService.getMeseros().subscribe(
      (data) => {
        this.meseros = data;  
      },
      (error) => {
        console.error('Error al obtener los meseros:', error); 
      }
    );
  }

  deleteMesero(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este mesero?')) {
      this.meseroService.deleteMesero(id).subscribe(
        () => {
          const mesero = this.meseros.find(m => m._id === id);
          if (mesero) {
            mesero.activo = false; 
            console.log('Mesero marcado como eliminado (estado activo: false)');
          }
        },
        (error) => {
          console.error('Error al eliminar el mesero:', error);
        }
      );
    }
  }
}
