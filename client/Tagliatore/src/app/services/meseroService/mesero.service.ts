import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Mesero } from '../../interfaces/mesero'; // Importa la interfaz del mesero

@Injectable({
  providedIn: 'root'
})
export class MeseroService {

  private urlMeseros = 'http://localhost:3000/api/meseros'; // URL de la API para meseros

  constructor(private http: HttpClient) { }

  // Obtener todos los meseros
  getMeseros(): Observable<Mesero[]> {
    const httpOptions = this.createHttpOptions();
    return this.http.get<Mesero[]>(this.urlMeseros, httpOptions).pipe(
      tap(response => {
        console.log('Meseros obtenidos:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Obtener un mesero por ID
  getMeseroById(id: string): Observable<Mesero> {
    const httpOptions = this.createHttpOptions();
    const url = `${this.urlMeseros}/${id}`;
    return this.http.get<Mesero>(url, httpOptions).pipe(
      tap(response => {
        console.log('Mesero obtenido:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Crear un nuevo mesero
  postMesero(mesero: Mesero): Observable<Mesero> {
    const httpOptions = this.createHttpOptions();
    return this.http.post<Mesero>(this.urlMeseros, JSON.stringify(mesero), httpOptions).pipe(
      tap(response => {
        console.log('Mesero creado:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Actualizar un mesero existente
  putMesero(id: string, mesero: Mesero): Observable<Mesero> {
    const httpOptions = this.createHttpOptions();
    const url = `${this.urlMeseros}/${id}`;
    return this.http.put<Mesero>(url, JSON.stringify(mesero), httpOptions).pipe(
      tap(response => {
        console.log('Mesero actualizado:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Eliminar un mesero
  deleteMesero(id: string): Observable<void> {
    const httpOptions = this.createHttpOptions();
    const url = `${this.urlMeseros}/${id}`;
    return this.http.delete<void>(url, httpOptions).pipe(
      tap(() => {
        console.log('Mesero eliminado');
      }),
      catchError(this.handleError)
    );
  }

  // Crear encabezados HTTP con el token
  private createHttpOptions(): { headers: HttpHeaders } {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No se encontró un token de autenticación en el almacenamiento');
    }

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Agrega el token al encabezado Authorization
      })
    };
  }

  // Manejo de errores centralizado
  private handleError(error: any) {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Ocurrió un error en la solicitud; por favor intente nuevamente más tarde.'));
  }
}
