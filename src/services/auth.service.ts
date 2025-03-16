import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { loginUser } from '../models/loginUser.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthSubject = new BehaviorSubject<boolean>(false);
  public isAuth$ = this.isAuthSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  SignIn(user: loginUser) {
    const response = this.http.post<any>(`/login`, {
      ...user,
    });
    response.subscribe(
      (res) => {
        if (res.token) {
          sessionStorage.setItem('token', res.data.token);
        }
        this.isAuthSubject.next(true);
      },
      (error) => {
        alert('Error:' + error.message);
      }
    );
  }
  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  logout() {
    this.isAuthSubject.next(false);
    sessionStorage.removeItem('token');
  }
}
