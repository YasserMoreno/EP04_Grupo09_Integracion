import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Cliente } from '../../interfaces/cliente';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlClientes = "http://localhost:3000/api/clientes"; // URL de la API para clientes

  constructor(private http: HttpClient) { }

  // Obtener todos los clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlClientes, httpOptions).pipe(
      tap(response => {
        console.log('Clientes obtenidos:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Obtener un cliente por ID
  getClienteById(id: string): Observable<Cliente> {
    const url = `${this.urlClientes}/${id}`;
    return this.http.get<Cliente>(url, httpOptions).pipe(
      tap(response => {
        console.log('Cliente obtenido:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Crear un nuevo cliente
  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlClientes, JSON.stringify(cliente), httpOptions).pipe(
      tap(response => {
        console.log('Cliente creado:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Actualizar un cliente existente
  updateCliente(id: string, cliente: Cliente): Observable<Cliente> {
    const url = `${this.urlClientes}/${id}`;
    return this.http.put<Cliente>(url, JSON.stringify(cliente), httpOptions).pipe(
      tap(response => {
        console.log('Cliente actualizado:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Eliminar un cliente
  deleteCliente(id: string): Observable<void> {
    const url = `${this.urlClientes}/${id}`;
    return this.http.delete<void>(url, httpOptions).pipe(
      tap(() => {
        console.log('Cliente eliminado');
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
