import { Component, OnInit } from '@angular/core';
import { PlatilloService } from '../../services/platilloService/platillo.service';
import { CategoriaService } from '../../services/categoriaService/categoria.service';
import { Platillo } from '../../interfaces/platillo';
import { Categoria } from '../../interfaces/categoria';
import { ActivatedRoute, Router } from '@angular/router';  // Asegúrate de importar Router
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-platillo',
  templateUrl: './editar-platillo.component.html',
  styleUrls: ['./editar-platillo.component.css'],
  standalone: true,
  imports: [FooterComponent, HeaderComponent, SidebarComponent, RouterModule, FormsModule, CommonModule]
})
export class EditarPlatilloComponent implements OnInit {

  platilloData: Platillo = {
    _id: '',
    nombre: '',
    ingredientes: [],
    precio: 0,
    imagenes: [],
    categoriaId: { _id: '', nombre: '' } // Relación con la categoría
  };
  
  categorias: Categoria[] = []; // Lista de categorías

  // Esta propiedad se utilizará para capturar las URLs de imágenes ingresadas como string
  imagenesString: string = '';

  constructor(
    private platillosService: PlatilloService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router  // Inyectamos Router aquí
  ) {}

  ngOnInit(): void {
    this.loadCategorias();
    this.loadPlatilloData();
  }

  loadCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Error al cargar las categorías:', err);
      }
    });
  }

  loadPlatilloData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.platillosService.getPlatilloById(id).subscribe({
        next: (data: Platillo) => {
          this.platilloData = data;
          // Convertir las URLs de las imágenes en un string separado por saltos de línea
          this.imagenesString = data.imagenes.join('\n');
        },
        error: (err) => {
          console.error('Error al cargar el platillo:', err);
        }
      });
    }
  }

  // Función para separar los links de las imágenes y almacenarlas en el array de imagenes
  updateImageLinks(): void {
    this.platilloData.imagenes = this.imagenesString
      .split('\n')  // Separar por saltos de línea
      .map(url => url.trim())  // Eliminar espacios innecesarios
      .filter(url => url.length > 0);  // Filtrar los valores vacíos
  }

  // Función para eliminar una imagen
  removeImage(index: number): void {
    this.platilloData.imagenes.splice(index, 1);
  }

  guardarCambios(): void {
    // Actualizar las imágenes con los links ingresados
    this.updateImageLinks();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const updatedPlatillo: Platillo = {
        ...this.platilloData,
        imagenes: this.platilloData.imagenes,
        updatedAt: new Date().toISOString() // Fecha de actualización
      };

      this.platillosService.putPlatillo(id, updatedPlatillo).subscribe({
        next: (response) => {
          console.log('Platillo actualizado:', response);
          alert('Platillo actualizado exitosamente.');
          this.router.navigate(['/platillos']);  // Redirigir a la página de platillos
        },
        error: (err) => {
          console.error('Error al actualizar el platillo:', err);
          alert('Error al actualizar el platillo.');
        }
      });
    }
  }
}
