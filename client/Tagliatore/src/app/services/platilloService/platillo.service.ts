import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platillo } from '../../interfaces/platillo';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlatilloService {

  private urlPlatillos = "http://localhost:3000/api/platillos";
  mensajeDelete = "";

  constructor(private http: HttpClient) { }

  // Obtener todos los platillos
  getPlatillos(): Observable<Platillo[]> {
    const httpOptions = this.createHttpOptions();
    console.log('Haciendo solicitud GET a:', this.urlPlatillos);
    return this.http.get<Platillo[]>(this.urlPlatillos, httpOptions).pipe(
      tap(response => {
        console.log('Platillos obtenidos:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Obtener un platillo por ID
  getPlatilloById(id: string): Observable<Platillo> {
    const httpOptions = this.createHttpOptions();
    const url = `${this.urlPlatillos}/${id}`;
    console.log('Haciendo solicitud GET a:', url);
    return this.http.get<Platillo>(url, httpOptions).pipe(
      tap(response => {
        console.log('Platillo obtenido:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Crear un nuevo platillo
  postPlatillo(platillo: Platillo): Observable<{ nuevoPlatillo: Platillo; mensaje: string }> {
    const httpOptions = this.createHttpOptions();
    console.log('Haciendo solicitud POST a:', this.urlPlatillos);
    return this.http.post<{ nuevoPlatillo: Platillo; mensaje: string }>(this.urlPlatillos, platillo, httpOptions).pipe(
      tap(response => {
        console.log('Platillo creado:', response.nuevoPlatillo);
      }),
      catchError(this.handleError)
    );
  }

  // Eliminar un platillo
  deletePlatillo(id: string): Observable<{ platillo: Platillo; mensaje: string }> {
    const httpOptions = this.createHttpOptions();
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

  // Editar un platillo existente
  putPlatillo(id: string, platillo: Platillo): Observable<{ platilloEditado: Platillo; mensaje: string }> {
    const httpOptions = this.createHttpOptions();
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
    const httpOptions = this.createHttpOptions();
    const url = `${this.urlPlatillos}/categoria/${categoriaId}`;
    console.log('Haciendo solicitud GET a:', url);
    return this.http.get<Platillo[]>(url, httpOptions).pipe(
      tap(response => {
        console.log('Platillos obtenidos por categoría:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Crear encabezados HTTP con token
  private createHttpOptions(): { headers: HttpHeaders } {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No se encontró un token de autenticación en el almacenamiento');
    }

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Token en el encabezado Authorization
      })
    };
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
