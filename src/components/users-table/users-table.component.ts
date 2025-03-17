import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-table',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    CommonModule,
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableComponent {
  @Input() users: User[] = [];

  @Output() userDeleted = new EventEmitter<User>();
  @Output() userEdited = new EventEmitter<User>();
  constructor() {
    console.log('users:::', this.users);
  }
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'jobTitle',
    'company',
    'yearsOfExperience',
    'compareWithOthers',
    'allowPublicPresentations',
    'accountStatus',
    'actions',
  ];

  onEdit(user: User) {
    // הגדרת פעולה לעריכה (לדוגמה, ניווט לעמוד עריכת משתמש)
    console.log('Edit user', user);
    this.userEdited.emit(user);
  }

  onDelete(user: User) {
    // הגדרת פעולה למחיקה (לדוגמה, קריאה לשירות מחיקה)
    console.log('Delete user', user);
    this.userDeleted.emit(user);
  }
}
