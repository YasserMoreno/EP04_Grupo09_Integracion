import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Mesa } from '../../interfaces/mesa'; // Asumiendo que la interfaz está en 'mesa.interface.ts'

@Injectable({
  providedIn: 'root'
})
export class MesaService {
  private apiUrl = 'http://localhost:3000/api/mesas'; // La URL de tu API de mesas

  constructor(private http: HttpClient) {}

  // Obtener todas las mesas
  getMesas(): Observable<Mesa[]> {
    const httpOptions = this.createHttpOptions();
    return this.http.get<Mesa[]>(this.apiUrl, httpOptions).pipe(
      tap(response => console.log('Mesas obtenidas:', response)),
      catchError(this.handleError)
    );
  }

  // Crear una nueva mesa
  createMesa(mesa: Mesa): Observable<Mesa> {
    const httpOptions = this.createHttpOptions();
    return this.http.post<Mesa>(this.apiUrl, mesa, httpOptions).pipe(
      tap(response => console.log('Mesa creada:', response)),
      catchError(this.handleError)
    );
  }

  // Obtener una mesa por ID
  getMesaById(id: string): Observable<Mesa> {
    const httpOptions = this.createHttpOptions();
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Mesa>(url, httpOptions).pipe(
      tap(response => console.log('Mesa obtenida:', response)),
      catchError(this.handleError)
    );
  }

  // Actualizar una mesa
  updateMesa(id: string, mesa: Mesa): Observable<Mesa> {
    const httpOptions = this.createHttpOptions();
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Mesa>(url, mesa, httpOptions).pipe(
      tap(response => console.log('Mesa actualizada:', response)),
      catchError(this.handleError)
    );
  }

  // Eliminar una mesa
  deleteMesa(id: string): Observable<void> {
    const httpOptions = this.createHttpOptions();
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, httpOptions).pipe(
      tap(() => console.log('Mesa eliminada')),
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
    return throwError(() => new Error('Ocurrió un error en la solicitud; por favor intente nuevamente más tarde.'));
  }
}
