import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platillo } from '../../interfaces/platillo';
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
export class PlatillosService {

  private urlPlatillos = "http://localhost:3000/api/platillos";
  mensajeDelete = "";

  constructor(private http: HttpClient) { }

  getPlatillos(): Observable<Platillo[]> {
    console.log('Haciendo solicitud GET a:', this.urlPlatillos);
    return this.http.get<Platillo[]>(this.urlPlatillos, httpOptions).pipe(
      tap(response => {
        console.log('Platillos obtenidos:', response);
      }),
      catchError(this.handleError)
    );
  }

  getPlatilloById(id: string): Observable<Platillo> {
    const url = `${this.urlPlatillos}/${id}`;
    console.log('Haciendo solicitud GET a:', url);
    return this.http.get<Platillo>(url, httpOptions).pipe(
      tap(response => {
        console.log('Platillo obtenido:', response);
      }),
      catchError(this.handleError)
    );
  }

  postPlatillo(platillo: Platillo): Observable<{ nuevoPlatillo: Platillo; mensaje: string }> {
    console.log('Haciendo solicitud POST a:', this.urlPlatillos);
    return this.http.post<{ nuevoPlatillo: Platillo; mensaje: string }>(this.urlPlatillos, platillo, httpOptions).pipe(
      tap(response => {
        console.log('Platillo creado:', response.nuevoPlatillo);
      }),
      catchError(this.handleError)
    );
  }

  deletePlatillo(id: string): Observable<{ platillo: Platillo; mensaje: string }> {
    const url = `${this.urlPlatillos}/${id}`;
    console.log('Haciendo solicitud DELETE a:', url);
    return this.http.delete<{ platillo: Platillo; mensaje: string }>(url, httpOptions).pipe(
      tap(response => {
        this.mensajeDelete = response.mensaje;
        console.log('Platillo eliminado:', response.platillo);
      }),
      catchError(this.handleError)
    );
  }

  // Nuevo método: Editar un platillo existente
  putPlatillo(id: string, platillo: Platillo): Observable<{ platilloEditado: Platillo; mensaje: string }> {
    const url = `${this.urlPlatillos}/${id}`;
    console.log('Haciendo solicitud PUT a:', url);
    return this.http.put<{ platilloEditado: Platillo; mensaje: string }>(url, platillo, httpOptions).pipe(
      tap(response => {
        console.log('Platillo editado:', response.platilloEditado);
      }),
      catchError(this.handleError)
    );
  }

  // Obtener platillos por categoría
  getPlatillosByCategoria(categoriaId: string): Observable<Platillo[]> {
    const url = `${this.urlPlatillos}/categoria/${categoriaId}`;
    console.log('Haciendo solicitud GET a:', url);
    return this.http.get<Platillo[]>(url, httpOptions).pipe(
      tap(response => {
        console.log('Platillos obtenidos por categoría:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Manejo de errores centralizado
  private handleError(error: any) {
    console.error('Ocurrió un error:', error);
    if (error.status) {
      console.error(`Código de error HTTP: ${error.status}`);
    }
    if (error.message) {
      console.error(`Mensaje de error: ${error.message}`);
    }
    return throwError(() => new Error('Ocurrió un error en la solicitud; por favor intente nuevamente más tarde.'));
  }
}
