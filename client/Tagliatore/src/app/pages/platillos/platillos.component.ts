import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Platillo } from '../../interfaces/platillo';
import { Categoria } from '../../interfaces/categoria';
import { PlatilloService } from '../../services/platilloService/platillo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-platillos',
  standalone: true,
  imports: [FooterComponent, SidebarComponent, HeaderComponent, RouterModule, CommonModule],
  templateUrl: './platillos.component.html',
  styleUrls: ['./platillos.component.css']
})
export class PlatillosComponent implements OnInit {

  platilloData: Platillo[] = []; 
  categoriaData: Categoria | null = null;
  mensajeDelete: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private platilloService: PlatilloService
  ) {}

  ngOnInit(): void {
    this.getPlatillos();
  }

  getPlatillos(): void {
    console.log("Solicitando todos los platillos...");

    this.platilloService.getPlatillos().subscribe({
      next: (response) => {
        console.log('Platillos obtenidos:', response);
        this.platilloData = response; 
        if (response.length > 0) {
          this.categoriaData = response[0].categoriaId || null; 
        }
      },
      error: (err: any) => {
        console.error('Error al obtener los platillos:', err);
      }
    });
  }

  async deletePlatillo(id: string) {
    // Confirmar antes de eliminar el platillo
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este platillo? Esta acción no se puede deshacer.');

    if (confirmDelete) {
      try {
        this.platilloService.deletePlatillo(id).subscribe({
          next: response => {
            console.log('Respuesta de eliminación:', response.mensaje);
            this.mensajeDelete = response.mensaje; 
            this.platilloData = this.platilloData.filter(platillo => platillo._id !== id);
          },
          error: err => {
            console.error('Error al eliminar el platillo:', err.message);
            this.mensajeDelete = 'Error al eliminar el platillo. Inténtelo de nuevo más tarde.';
          }
        });
      } catch (err) {
        console.error(`Error al procesar la eliminación del platillo: ${err}`);
        this.mensajeDelete = 'Error al procesar la solicitud. Inténtelo de nuevo más tarde.';
      }
    } else {
      console.log('Eliminación cancelada.');
    }
  }
}
