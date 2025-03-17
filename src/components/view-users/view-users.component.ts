import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsersTableComponent } from '../users-table/users-table.component';
import { UserService } from '../../services/user.service';
import { UsersCardsComponent } from '../users-cards/users-cards.component';
import { DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  users: User[] = [
    // כאן יהיו המשתמשים (או תקבל את המידע הזה ממסד נתונים או שירות)
  ];

  constructor(public userService: UserService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.userService.users$.subscribe((users) => {
      this.users = users;
    });

    this.userService.loadUsers();
    console.log(this.users);
  }
  lastUpdated = new Date();
  displayAsCards = true; // משתנה שמווסת את התצוגה (כרטיסים או טבלה)

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
    // פעולה לעריכת משתמש (לדוגמה, ניווט לעמוד עריכת משתמש)
    console.log('Edit user', user);
  }
  onDelete(user: User) {
    // פעולה למחיקה (לדוגמה, קריאה לשירות מחיקה)
    console.log('view users Delete user', user);
  }
}
