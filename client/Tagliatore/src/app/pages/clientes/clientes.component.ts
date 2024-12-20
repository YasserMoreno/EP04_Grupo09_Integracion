import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/clienteService/cliente.service';
import { Cliente } from '../../interfaces/cliente';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, FooterComponent, RouterModule, CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];  
  errorMessage: string | undefined; 

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (response) => {
        this.clientes = response;
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.error('Error al obtener los clientes:', err);
      }
    });
  }

  deleteCliente(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      this.clienteService.deleteCliente(id).subscribe({
        next: () => {
          this.clientes = this.clientes.filter(cliente => cliente._id !== id);
          console.log('Cliente eliminado');
        },
        error: (err) => {
          this.errorMessage = err.message;
          console.error('Error al eliminar el cliente:', err);
        }
      });
    }
  }
}
