import { Component } from '@angular/core';
import { CategoriaService } from './../../services/categoriaService/categoria.service';
import { Categoria } from '../../interfaces/categoria';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-categoria',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, SidebarComponent, RouterModule, FormsModule],
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.css']
})
export class AgregarCategoriaComponent {

  categoria: Categoria = { _id: '', nombre: '', descripcion: '' };

  constructor(
    private categoriaService: CategoriaService,
    private router: Router 
  ) { }

  agregarCategoria(): void {
    this.categoriaService.createCategoria(this.categoria).subscribe(
      (response) => {
        console.log('Categoría creada con éxito:', response);
        
        alert('Categoría agregada con éxito');
        
        this.router.navigate(['/categorias']);
      },
      (error) => {
        console.error('Error al crear la categoría:', error);
        alert('Ocurrió un error al agregar la categoría');
      }
    );
  }
}
