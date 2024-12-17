import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../../interfaces/categoria';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlCategorias = "http://localhost:3000/api/categorias";

  constructor(private http: HttpClient) { }

  // Obtener todas las categorías
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlCategorias, httpOptions).pipe(
      tap(response => {
        console.log('Categorías obtenidas:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Obtener una categoría por ID
  getCategoriaById(id: string): Observable<Categoria> {
    const url = `${this.urlCategorias}/${id}`;
    return this.http.get<Categoria>(url, httpOptions).pipe(
      tap(response => {
        console.log('Categoría obtenida:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Crear una nueva categoría (POST)
  createCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.urlCategorias, JSON.stringify(categoria), httpOptions).pipe(
      tap(response => {
        console.log('Categoría creada:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Actualizar una categoría existente (PUT)
  updateCategoria(id: string, categoria: Categoria): Observable<Categoria> {
    const url = `${this.urlCategorias}/${id}`;
    return this.http.put<Categoria>(url, JSON.stringify(categoria), httpOptions).pipe(
      tap(response => {
        console.log('Categoría actualizada:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Eliminar una categoría (DELETE)
  deleteCategoria(id: string): Observable<void> {
    const url = `${this.urlCategorias}/${id}`;
    return this.http.delete<void>(url, httpOptions).pipe(
      tap(() => {
        console.log('Categoría eliminada');
      }),
      catchError(this.handleError)
    );
  }

  // Manejo de errores centralizado
  private handleError(error: any) {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Ocurrió un error en la solicitud; por favor intente nuevamente más tarde.'));
  }
}
