import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrdenService } from './../../services/ordenService/orden.service';
import { ClienteService } from './../../services/clienteService/cliente.service';
import { MeseroService } from './../../services/meseroService/mesero.service';
import { PlatilloService } from './../../services/platilloService/platillo.service';
import { MesaService } from './../../services/mesaService/mesa.service';  // Servicio para mesas
import { Orden } from '../../interfaces/orden';
import { Cliente } from '../../interfaces/cliente';
import { Mesero } from '../../interfaces/mesero';
import { Platillo } from '../../interfaces/platillo';
import { Mesa } from '../../interfaces/mesa';  // Asegúrate de tener la interfaz Mesa
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-editar-orden',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, SidebarComponent, RouterModule, FormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './editar-orden.component.html',
  styleUrls: ['./editar-orden.component.css']
})
export class EditarOrdenComponent implements OnInit {
  orden: Orden = {
    _id: '',
    mesaId: {} as Mesa,
    clienteId: {} as Cliente,
    meseroId: {} as Mesero,
    platillos: [],
    estado: 'pendiente'
  };
  clientes: Cliente[] = [];
  meseros: Mesero[] = [];
  platillos: Platillo[] = [];
  mesas: Mesa[] = [];  // Lista de mesas
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private ordenService: OrdenService,
    private clienteService: ClienteService,
    private meseroService: MeseroService,
    private platilloService: PlatilloService,
    private mesaService: MesaService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const ordenId = this.activatedRoute.snapshot.paramMap.get('id')!;
    if (ordenId) {
      this.getOrdenById(ordenId);
    }
    this.getClientes();
    this.getMeseros();
    this.getPlatillos();
    this.getMesas(); 
  }

  getOrdenById(id: string): void {
    this.loading = true;
    this.ordenService.getOrdenById(id).subscribe({
      next: (data) => {
        this.orden = data;
        this.loading = false;
        console.log('Orden obtenida:', this.orden);
      },
      error: (error) => {
        this.errorMessage = 'Error al obtener la orden';
        console.error(error);
        this.loading = false;
      }
    });
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (error) => {
        this.errorMessage = 'Error al obtener los clientes';
        console.error(error);
      }
    });
  }

  getMeseros(): void {
    this.meseroService.getMeseros().subscribe({
      next: (data) => {
        this.meseros = data;
      },
      error: (error) => {
        this.errorMessage = 'Error al obtener los meseros';
        console.error(error);
      }
    });
  }

  getPlatillos(): void {
    this.platilloService.getPlatillos().subscribe({
      next: (data) => {
        this.platillos = data;
      },
      error: (error) => {
        this.errorMessage = 'Error al obtener los platillos';
        console.error(error);
      }
    });
  }

  getMesas(): void {
    this.mesaService.getMesas().subscribe({
      next: (data) => {
        this.mesas = data;
      },
      error: (error) => {
        this.errorMessage = 'Error al obtener las mesas';
        console.error(error);
      }
    });
  }

  updateOrden(): void {
    this.loading = true;
    console.log('Orden antes de actualizar:', this.orden);  // Verifica la lista de platillos
    this.ordenService.updateOrden(this.orden._id, this.orden).subscribe({
      next: (data) => {
        this.loading = false;
        alert('Orden actualizada exitosamente');
        this.router.navigate(['/ordenes']);
      },
      error: (error) => {
        this.errorMessage = 'Error al actualizar la orden';
        console.error(error);
        this.loading = false;
      }
    });
  }
  

  addPlatillo(): void {
    this.orden.platillos.push({ platilloId: {} as Platillo, cantidad: 1 });
    this.cdRef.detectChanges();  // Fuerza la detección de cambios
    console.log(this.orden.platillos);  // Verifica si el platillo se agrega correctamente
  }
  

  removePlatillo(index: number): void {
    this.orden.platillos.splice(index, 1);
  }

  updateCantidad(index: number, cantidad: number): void {
    this.orden.platillos[index].cantidad = cantidad;  // Cambia la cantidad directamente
    console.log(this.orden.platillos);  // Verifica si el cambio se refleja
  }
  
  
}
