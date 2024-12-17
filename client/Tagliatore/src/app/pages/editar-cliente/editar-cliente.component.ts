import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Para manejar parámetros de ruta
import { ClienteService } from '../../services/clienteService/cliente.service'; // Asegúrate de importar el servicio
import { Cliente } from '../../interfaces/cliente'; // Asegúrate de tener la interfaz Cliente
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, SidebarComponent, CommonModule, FormsModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css'
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = { _id: '', nombre: '', correo: '', telefono: '', dni: '' }; 
  id: string = ''; 

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute, 
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || ''; 
    if (this.id) {
      this.obtenerCliente();
    }
  }

  obtenerCliente(): void {
    this.clienteService.getClienteById(this.id).subscribe(
      (cliente) => {
        this.cliente = cliente; 
      },
      (error) => {
        console.error('Error al obtener el cliente:', error);
      }
    );
  }

  actualizarCliente(): void {
    this.clienteService.updateCliente(this.id, this.cliente).subscribe(
      (response) => {
        console.log('Cliente actualizado:', response);
        this.router.navigate(['/clientes']);
      },
      (error) => {
        console.error('Error al actualizar el cliente:', error);
      }
    );
  }
}
