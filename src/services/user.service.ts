import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
interface UsersResponse<T> {
  data: T[];
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );
  public users$: Observable<User[]> = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  loadUsers() {
  
    this.http.get<UsersResponse<User>>('users').subscribe(
      (response) => {
        this.usersSubject.next(response.data);
        console.log('users loaded', response.data);
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }
  updateUser(user: User) {
    console.log('updating user', user.accountStatus);
    this.http.put(`users/${user.id}`, user).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        this.loadUsers();
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

  deleteUser(userId: number) {
    console.log('deleting user', userId);
    this.http.delete(`users/${userId}`).subscribe(
      (response) => {
        console.log('User deleted successfully:', response);
        this.loadUsers();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}
