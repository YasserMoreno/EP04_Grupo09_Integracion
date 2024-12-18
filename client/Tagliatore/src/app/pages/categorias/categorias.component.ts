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

  categorias: Categoria[] = []; 

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.getCategorias(); 
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      (data) => {
        this.categorias = data; 
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }

  deleteCategoria(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.categoriaService.deleteCategoria(id).subscribe(
        () => {
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
