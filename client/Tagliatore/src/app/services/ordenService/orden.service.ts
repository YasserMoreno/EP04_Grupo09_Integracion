import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Orden } from '../../interfaces/orden';

@Injectable({
  providedIn: 'root',
})
export class OrdenService {
  private urlOrdenes = 'http://localhost:3000/api/ordenes';

  constructor(private http: HttpClient) {}

  // Obtener todas las órdenes
  getOrdenes(): Observable<Orden[]> {
    const httpOptions = this.createHttpOptions();
    return this.http.get<Orden[]>(this.urlOrdenes, httpOptions).pipe(
      tap((response) => {
        console.log('Órdenes obtenidas:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Obtener una orden por ID
  getOrdenById(id: string): Observable<Orden> {
    const httpOptions = this.createHttpOptions();
    const url = `${this.urlOrdenes}/${id}`;
    return this.http.get<Orden>(url, httpOptions).pipe(
      tap((response) => {
        console.log('Orden obtenida:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Obtener órdenes por mesa ID
  getOrdenesByMesaId(mesaId: string): Observable<Orden[]> {
    const httpOptions = this.createHttpOptions();
    const url = `${this.urlOrdenes}/mesa/${mesaId}`;
    return this.http.get<Orden[]>(url, httpOptions).pipe(
      tap((response) => {
        console.log(`Órdenes obtenidas para la mesa ${mesaId}:`, response);
      }),
      catchError(this.handleError)
    );
  }

  // Crear una nueva orden
  createOrden(orden: Orden): Observable<Orden> {
    const httpOptions = this.createHttpOptions();
    return this.http.post<Orden>(
      this.urlOrdenes,
      JSON.stringify(orden),
      httpOptions
    ).pipe(
      tap((response) => {
        console.log('Orden creada:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Actualizar una orden existente
  updateOrden(id: string, orden: Orden): Observable<Orden> {
    const httpOptions = this.createHttpOptions();
    const url = `${this.urlOrdenes}/${id}`;
    return this.http.put<Orden>(
      url,
      JSON.stringify(orden),
      httpOptions
    ).pipe(
      tap((response) => {
        console.log('Orden actualizada:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Eliminar una orden
  deleteOrden(id: string): Observable<void> {
    const httpOptions = this.createHttpOptions();
    const url = `${this.urlOrdenes}/${id}`;
    return this.http.delete<void>(url, httpOptions).pipe(
      tap(() => {
        console.log('Orden eliminada');
      }),
      catchError(this.handleError)
    );
  }

  // Crear encabezados HTTP con el token de autenticación
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
    return throwError(
      () =>
        new Error('Ocurrió un error en la solicitud; por favor intente nuevamente más tarde.')
    );
  }
}
