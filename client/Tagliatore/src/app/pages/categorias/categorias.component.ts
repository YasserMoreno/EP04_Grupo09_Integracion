import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './../../services/categoriaService/categoria.service';
import { Categoria } from '../../interfaces/categoria';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component"; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  imports: [SidebarComponent, HeaderComponent, FooterComponent, CommonModule, RouterModule],
  standalone: true
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[] = []; // Definimos la propiedad para almacenar las categorías

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.getCategorias(); // Llamamos al método para obtener las categorías al inicializar el componente
  }

  // Método para obtener todas las categorías desde el servicio
  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      (data) => {
        this.categorias = data; // Asignamos los datos obtenidos a la propiedad 'categorias'
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }

  // Método para eliminar una categoría
  deleteCategoria(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.categoriaService.deleteCategoria(id).subscribe(
        () => {
          // Filtramos la categoría eliminada de la lista local
          this.categorias = this.categorias.filter(categoria => categoria._id !== id);
          console.log('Categoría eliminada exitosamente');
        },
        (error) => {
          console.error('Error al eliminar la categoría:', error);
        }
      );
    }
  }
}
