import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrdenService } from './../../services/ordenService/orden.service';
import { Orden } from '../../interfaces/orden';
import { Router } from '@angular/router'; 
import { Cliente } from '../../interfaces/cliente';
import { Mesa } from '../../interfaces/mesa';
import { Mesero } from '../../interfaces/mesero';
import { Platillo } from '../../interfaces/platillo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/clienteService/cliente.service';
import { MesaService } from '../../services/mesaService/mesa.service';
import { MeseroService } from '../../services/meseroService/mesero.service';
import { PlatilloService } from '../../services/platilloService/platillo.service';

@Component({
  selector: 'app-agregar-orden',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, SidebarComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './agregar-orden.component.html',
  styleUrls: ['./agregar-orden.component.css']
})
export class AgregarOrdenComponent implements OnInit {
  orden: Orden = {
    _id: '',
    mesaId: { _id: '' } as Mesa,
    clienteId: {_id: ''} as Cliente,
    meseroId: {_id: ''} as Mesero,
    platillos: [],
    estado: 'pendiente'
  }; 

  clientes: Cliente[] = [];
  meseros: Mesero[] = [];
  platillos: Platillo[] = [];
  mesas: Mesa[] = [];

  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private ordenService: OrdenService,
    private clienteService: ClienteService,
    private meseroService: MeseroService,
    private platilloService: PlatilloService,
    private mesaService: MesaService, 
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getClientes();
    this.getMeseros();
    this.getPlatillos();
    this.getMesas(); 
  }

  agregarOrden(): void {
    this.loading = true;
    this.ordenService.createOrden(this.orden).subscribe({
      next: (data: Orden) => {
        this.loading = false;
        console.log('Orden agregada exitosamente:', data);
        alert('Orden agregada exitosamente.');
        this.router.navigate(['/ordenes']);
      },
      error: (error: any) => {
        this.errorMessage = 'Error al agregar la orden';
        console.error(error);
        this.loading = false;
        alert('Ocurrió un error al agregar la orden.');
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

    addPlatillo(): void {
      this.orden.platillos.push({ platilloId: {_id: ''} as Platillo, cantidad: 1 });
      this.cdRef.detectChanges(); 
      console.log(this.orden.platillos);
    }
    
  
    removePlatillo(index: number): void {
      this.orden.platillos.splice(index, 1);
    }
  
    updateCantidad(index: number, cantidad: number): void {
      this.orden.platillos[index].cantidad = cantidad; 
      console.log(this.orden.platillos); 
    }
}
