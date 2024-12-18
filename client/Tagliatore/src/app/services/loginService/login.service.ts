import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario: string, password: string): Observable<any> {
    return this.http.post<{ token: string, userName: string, error?: string }>(this.loginUrl, { usuario, password }).pipe(
      tap(response => {
        // Si la respuesta tiene el token, el login es exitoso
        if (response.token) {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('userName', response.userName);
        }
      }),
      catchError((error: any) => {
        let errorMessage = 'Ocurrió un error en el login'; 
        if (error?.error?.error) {
          errorMessage = error.error.error;  
        } else if (error?.error?.message) {
          errorMessage = error.error.message;
        }
        return of({ error: errorMessage });
      })
    );
  }

  logout(): void {
    if (this.isSessionStorageAvailable()) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userName');
    }
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (this.isSessionStorageAvailable()) {
      return sessionStorage.getItem('token');
    }
    return null;
  }

  getUser(): string | null {
    if (this.isSessionStorageAvailable()) {
      return sessionStorage.getItem('userName');
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (this.isSessionStorageAvailable()) {
      return !!sessionStorage.getItem('token');
    }
    return false;
  }

  private isSessionStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
    } catch {
      return false;
    }
  }

}
