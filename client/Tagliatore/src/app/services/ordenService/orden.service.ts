import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Orden } from '../../interfaces/orden';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class OrdenService {
  private urlOrdenes = 'http://localhost:3000/api/ordenes'; 

  constructor(private http: HttpClient) {}

  getOrdenes(): Observable<Orden[]> {
    return this.http.get<Orden[]>(this.urlOrdenes, httpOptions).pipe(
      tap((response) => {
        console.log('Órdenes obtenidas:', response);
      }),
      catchError(this.handleError)
    );
  }

  getOrdenById(id: string): Observable<Orden> {
    const url = `${this.urlOrdenes}/${id}`;
    return this.http.get<Orden>(url, httpOptions).pipe(
      tap((response) => {
        console.log('Orden obtenida:', response);
      }),
      catchError(this.handleError)
    );
  }

  getOrdenesByMesaId(mesaId: string): Observable<Orden[]> {
    const url = `${this.urlOrdenes}/mesa/${mesaId}`;
    return this.http.get<Orden[]>(url, httpOptions).pipe(
      tap((response) => {
        console.log(`Órdenes obtenidas para la mesa ${mesaId}:`, response);
      }),
      catchError(this.handleError)
    );
  }

  createOrden(orden: Orden): Observable<Orden> {
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

  updateOrden(id: string, orden: Orden): Observable<Orden> {
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

  deleteOrden(id: string): Observable<void> {
    const url = `${this.urlOrdenes}/${id}`;
    return this.http.delete<void>(url, httpOptions).pipe(
      tap(() => {
        console.log('Orden eliminada');
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Ocurrió un error:', error);
    return throwError(
      () =>
        new Error('Ocurrió un error en la solicitud; por favor intente nuevamente más tarde.')
    );
  }
}
