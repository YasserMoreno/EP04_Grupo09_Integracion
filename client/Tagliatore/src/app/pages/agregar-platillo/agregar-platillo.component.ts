import { Component, OnInit } from '@angular/core';
import { PlatillosService } from '../../services/platilloService/platillo.service';
import { CategoriaService } from '../../services/categoriaService/categoria.service';
import { Platillo } from '../../interfaces/platillo';
import { Categoria } from '../../interfaces/categoria';
import { Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar-platillo',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, SidebarComponent, RouterModule, FormsModule, CommonModule],
  templateUrl: './agregar-platillo.component.html',
  styleUrls: ['./agregar-platillo.component.css']
})
export class AgregarPlatilloComponent implements OnInit {

  platilloData: Platillo = {
    _id: '',
    nombre: '',
    ingredientes: [],
    precio: 0,
    imagenes: [],
    categoriaId: { _id: '', nombre: '' }
  };
  
  categorias: Categoria[] = []; // Lista de categorías disponibles
  imagenesString: string = '';  // Propiedad para almacenar las URLs de imágenes ingresadas como string
  imagePreviews: string[] = []; // Array para almacenar las URLs de las imágenes para vista previa

  constructor(
    private platillosService: PlatillosService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  // Cargar las categorías disponibles desde el servicio
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

  // Función para separar los links de las imágenes y almacenarlas en el array de imagenes
  updateImageLinks(): void {
    this.platilloData.imagenes = this.imagenesString
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0); // Filtrar los valores vacíos

    // Actualizar las vistas previas de todas las URLs ingresadas
    this.imagePreviews = this.platilloData.imagenes.filter(url => this.isValidImageUrl(url));
  }

  // Validar si la URL es una imagen
  isValidImageUrl(url: string): boolean {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) !== null);
  }

  // Función para agregar un platillo
  agregarPlatillo(): void {
    this.updateImageLinks(); // Actualizar las imágenes con los links ingresados

    const newPlatillo: Platillo = {
      ...this.platilloData,
      imagenes: this.platilloData.imagenes,
      createdAt: new Date().toISOString() // Fecha de creación
    };

    this.platillosService.postPlatillo(newPlatillo).subscribe({
      next: (response) => {
        console.log('Platillo agregado:', response.nuevoPlatillo);
        alert('Platillo agregado exitosamente.');
        this.router.navigate(['/platillos']); // Redirigir al listado de platillos
      },
      error: (err) => {
        console.error('Error al agregar el platillo:', err);
        alert('Error al agregar el platillo.');
      }
    });
  }
}
