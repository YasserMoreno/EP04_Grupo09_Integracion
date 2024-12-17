import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Para obtener el ID de la categoría desde la URL
import { CategoriaService } from './../../services/categoriaService/categoria.service';
import { Categoria } from '../../interfaces/categoria';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, SidebarComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  categoria: Categoria = { _id: '', nombre: '', descripcion: '' }; // Definimos el objeto para la categoría
  id: string | null = ''; // Variable para almacenar el ID de la categoría

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');  // Obtenemos el ID de la categoría desde la URL
    if (this.id) {
      this.getCategoria(this.id);  // Llamamos a obtener la categoría si el ID está presente
    }
  }

  // Método para obtener la categoría por su ID
  getCategoria(id: string): void {
    this.categoriaService.getCategoriaById(id).subscribe(
      (data) => {
        this.categoria = data; // Asignamos los datos de la categoría a la propiedad 'categoria'
      },
      (error) => {
        console.error('Error al obtener la categoría:', error);
      }
    );
  }

  // Método para guardar los cambios de la categoría editada
  guardarCambios(): void {
    if (this.id) {
      this.categoriaService.updateCategoria(this.id, this.categoria).subscribe(
        (response) => {
          console.log('Categoría actualizada:', response);
          this.router.navigate(['/categorias']);  // Redirige a la lista de categorías después de actualizar
        },
        (error) => {
          console.error('Error al actualizar la categoría:', error);
        }
      );
    }
  }
}
