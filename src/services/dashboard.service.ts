import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminDashboard, initialDashboard } from '../models/dashboard.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseAPI } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  // public dashbordSubject = new BehaviorSubject<AdminDashboard>(
  //   initialDashboard
  // );
  // public dashboard$ = this.dashbordSubject.asObservable();
  constructor(private http: HttpClient) {}
  getDashboardData(): Observable<AdminDashboard> {
    return this.http.get<AdminDashboard>('admin/dashboard');
  }
  // getDashboardData() {
  //   this.http.get<ResponseAPI<AdminDashboard>>('admin/dashboard').subscribe(
  //     (res) => {
  //       this.dashbordSubject.next(res.data);
  //     },
  //     (error) => {
  //       console.log('Error:' + error.message);
  //     }
  //   );
  // }
}
