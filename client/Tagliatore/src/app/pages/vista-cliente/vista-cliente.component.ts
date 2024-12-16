import { Component } from '@angular/core';
import { ChatComponent } from '../../chat/chat.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vista-cliente',
  standalone: true,
  imports: [ChatComponent, CommonModule, FormsModule],
  templateUrl: './vista-cliente.component.html',
  styleUrl: './vista-cliente.component.css',
})
export class VistaClienteComponent {
  dni: string = '';
  dniIngresado: boolean = false;

  validarDNI() {
    if (this.dni && this.dni.length === 8) {
      this.dniIngresado = true;
    } else {
      // Puedes agregar aquí manejo de errores o validaciones adicionales
      alert('Por favor, ingrese un DNI válido de 8 dígitos');
    }
  }
}
