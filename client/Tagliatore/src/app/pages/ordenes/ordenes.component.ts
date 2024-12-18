import { OrdenService } from './../../services/ordenService/orden.service';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { RouterModule } from '@angular/router';
import { Orden } from '../../interfaces/orden';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, SidebarComponent, RouterModule, CommonModule],
  templateUrl: './ordenes.component.html',
  styleUrl: './ordenes.component.css'
})
export class OrdenesComponent implements OnInit {
  ordenes: Orden[] = []; 
  loading: boolean = false; 
  errorMessage: string = '';

  constructor(private ordenService: OrdenService) {}

  ngOnInit(): void {
    this.getOrdenes();
  }

  getOrdenes(): void {
    this.loading = true;
    this.ordenService.getOrdenes().subscribe({
      next: (data: Orden[]) => {
        this.ordenes = data;
        this.loading = false;
        console.log('Órdenes obtenidas:', this.ordenes);
      },
      error: (error: any) => {
        this.errorMessage = 'Error al obtener las órdenes';
        console.error(error);
        this.loading = false;
      },
    });
  }

  getPlatillos(platillos: any[]): string {
    return platillos
      .map(platillo => `${platillo.platilloId.nombre} - S/ ${platillo.platilloId.precio} (${platillo.cantidad})`)
      .join('<br>');
  }

  calcularTotal(orden: Orden): number {
    let total = 0;
    orden.platillos.forEach(platillo => {
      total += platillo.platilloId.precio * platillo.cantidad; 
    });
    return total; 
  }
  

  deleteOrden(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta orden? Esta acción no se puede deshacer.')) {
      this.loading = true;
      this.ordenService.deleteOrden(id).subscribe({
        next: () => {
          this.loading = false;
          console.log(`Orden con ID ${id} eliminada correctamente`);
          this.ordenes = this.ordenes.filter((orden) => orden._id !== id);
          alert('Orden eliminada exitosamente.');
        },
        error: (error: any) => {
          this.errorMessage = 'Error al eliminar la orden';
          console.error(error);
          alert('Ocurrió un error al eliminar la orden.');
          this.loading = false;
        },
      });
    } else {
      console.log('Eliminación cancelada por el usuario.');
    }
  }

}
