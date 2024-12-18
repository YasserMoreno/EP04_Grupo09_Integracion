import { Component, OnInit } from '@angular/core';
import { PlatilloService } from '../../services/platilloService/platillo.service';
import { CategoriaService } from '../../services/categoriaService/categoria.service';
import { Platillo } from '../../interfaces/platillo';
import { Categoria } from '../../interfaces/categoria';
import { ActivatedRoute, Router } from '@angular/router'; 
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
    categoriaId: { _id: '', nombre: '' } 
  };
  
  categorias: Categoria[] = []; 
  imagenesString: string = '';

  constructor(
    private platillosService: PlatilloService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router  
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
          this.imagenesString = data.imagenes.join('\n');
        },
        error: (err) => {
          console.error('Error al cargar el platillo:', err);
        }
      });
    }
  }

  updateImageLinks(): void {
    this.platilloData.imagenes = this.imagenesString
      .split('\n') 
      .map(url => url.trim())  
      .filter(url => url.length > 0);  
  }

  removeImage(index: number): void {
    this.platilloData.imagenes.splice(index, 1);
  }

  guardarCambios(): void {
    this.updateImageLinks();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const updatedPlatillo: Platillo = {
        ...this.platilloData,
        imagenes: this.platilloData.imagenes,
        updatedAt: new Date().toISOString() 
      };

      this.platillosService.putPlatillo(id, updatedPlatillo).subscribe({
        next: (response) => {
          console.log('Platillo actualizado:', response);
          alert('Platillo actualizado exitosamente.');
          this.router.navigate(['/platillos']); 
        },
        error: (err) => {
          console.error('Error al actualizar el platillo:', err);
          alert('Error al actualizar el platillo.');
        }
      });
    }
  }
}
