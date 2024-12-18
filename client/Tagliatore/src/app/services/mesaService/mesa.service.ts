import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Mesa } from '../../interfaces/mesa'; 
@Injectable({
  providedIn: 'root'
})
export class MesaService {
  private apiUrl = 'http://localhost:3000/api/mesas'; 

  constructor(private http: HttpClient) {}

  getMesas(): Observable<Mesa[]> {
    const httpOptions = this.createHttpOptions();
    return this.http.get<Mesa[]>(this.apiUrl, httpOptions).pipe(
      tap(response => console.log('Mesas obtenidas:', response)),
      catchError(this.handleError)
    );
  }

  createMesa(mesa: Mesa): Observable<Mesa> {
    const httpOptions = this.createHttpOptions();
    return this.http.post<Mesa>(this.apiUrl, mesa, httpOptions).pipe(
      tap(response => console.log('Mesa creada:', response)),
      catchError(this.handleError)
    );
  }

  getMesaById(id: string): Observable<Mesa> {
    const httpOptions = this.createHttpOptions();
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Mesa>(url, httpOptions).pipe(
      tap(response => console.log('Mesa obtenida:', response)),
      catchError(this.handleError)
    );
  }

  updateMesa(id: string, mesa: Mesa): Observable<Mesa> {
    const httpOptions = this.createHttpOptions();
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Mesa>(url, mesa, httpOptions).pipe(
      tap(response => console.log('Mesa actualizada:', response)),
      catchError(this.handleError)
    );
  }

  deleteMesa(id: string): Observable<void> {
    const httpOptions = this.createHttpOptions();
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, httpOptions).pipe(
      tap(() => console.log('Mesa eliminada')),
      catchError(this.handleError)
    );
  }

  private createHttpOptions(): { headers: HttpHeaders } {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No se encontró un token de autenticación en el almacenamiento');
    }
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  private handleError(error: any) {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Ocurrió un error en la solicitud; por favor intente nuevamente más tarde.'));
  }
}
