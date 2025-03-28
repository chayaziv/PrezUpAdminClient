import { Component, OnInit } from '@angular/core';
import { initUser, User } from '../../models/user.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsersTableComponent } from '../users-table/users-table.component';
import { UserService } from '../../services/user.service';
import { UsersCardsComponent } from '../users-cards/users-cards.component';
import { DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  imports: [
    MatToolbarModule,
    UsersTableComponent,
    UsersCardsComponent,
    DatePipe,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css',
})
export class ViewUsersComponent implements OnInit {
  users: User[] = [];

  constructor(public userService: UserService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.userService.users$.subscribe((users) => {
      this.users = users;
    });

    this.userService.loadUsers();
  }
  lastUpdated = new Date();
  displayAsCards = true;

  toggleView() {
    this.displayAsCards = !this.displayAsCards;
  }
  getActiveUsersCount(): number {
    return this.users.filter((user) => user.accountStatus === 'Active').length;
  }
  confirmDelete(user: User) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '550px',
      data: { name: user.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.onDelete(user);
      }
    });
  }
  onEdit(user: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: { user, isEdit: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.action === 'save') {
        const updatedUser: User = {
          ...user,
          ...result.data,
          role: {
            id: result.data.role === 'admin' ? 2 : 1,
            roleName: result.data.role,
          },
        };

        this.userService.updateUser(updatedUser);
      }
    });
  }
  onDelete(user: User) {
    // פעולה למחיקה (לדוגמה, קריאה לשירות מחיקה)
    this.userService.deleteUser(user.id);
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: { isEdit: false }, // מציינים שזה לא בעריכת משתמש קיים
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.action === 'save') {
        const newUser: User = {
          ...initUser,
          ...result.data,
          role: {
            id: result.data.role === 'admin' ? 2 : 1,
            roleName: result.data.role,
          },
        };
        this.userService.addUser(newUser);
      }
    });
  }
}
