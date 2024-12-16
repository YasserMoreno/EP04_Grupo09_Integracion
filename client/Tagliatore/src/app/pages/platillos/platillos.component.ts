import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Platillo } from '../../interfaces/platillo';
import { Categoria } from '../../interfaces/categoria';
import { PlatillosService } from '../../services/platilloService/platillo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-platillos',
  standalone: true,
  imports: [FooterComponent, SidebarComponent, HeaderComponent, RouterModule, CommonModule],
  templateUrl: './platillos.component.html',
  styleUrl: './platillos.component.css'
})

export class PlatillosComponent implements OnInit {

  platilloData: Platillo[] = [];  // Se mantendrá un array de platillos
  categoriaData: Categoria | null = null;

  constructor(
    private route: ActivatedRoute,
    private platilloService: PlatillosService
  ) {}

  ngOnInit(): void {
    // Llamar al servicio para obtener todos los platillos
    this.getPlatillos();
  }

  getPlatillos(): void {
    console.log("Solicitando todos los platillos...");

    this.platilloService.getPlatillos().subscribe({
      next: (response) => {
        console.log('Platillos obtenidos:', response);
        this.platilloData = response; // Aquí asignamos todos los platillos a platilloData
        // Si la respuesta incluye información sobre la categoría, asignarla
        if (response.length > 0) {
          this.categoriaData = response[0].categoriaId || null;  // Ejemplo: Asumimos que todos los platillos pueden tener una categoría común
        }
      },
      error: (err) => {
        console.error('Error al obtener los platillos:', err);
      }
    });
  }

}
