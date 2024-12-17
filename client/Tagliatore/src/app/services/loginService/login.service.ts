import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario: string, password: string): Observable<any> {
    return this.http.post<{ token: string, userName: string }>(this.loginUrl, { usuario, password: password }).pipe(
      tap(response => {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('userName', response.userName);
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getUser(): string | null {
    return sessionStorage.getItem('userName');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

}
