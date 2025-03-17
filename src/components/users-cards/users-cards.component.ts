import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-users-cards',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './users-cards.component.html',
  styleUrl: './users-cards.component.css',
})
export class UsersCardsComponent {
  @Input() users: User[] = [];
  @Output() userDeleted = new EventEmitter<User>();
  @Output() userEdited = new EventEmitter<User>();

  constructor(public userService: UserService, private dialog: MatDialog) {}

  expanded = false;

  expandedUsers: { [userId: number]: boolean } = {}; // אובייקט מעקב לכל משתמש

  toggleExpand(userId: number) {
    this.expandedUsers[userId] = !this.expandedUsers[userId];
  }

  onEdit(user: User) {
    this.userEdited.emit(user);
  }

  onDelete(user: User) {
    this.userDeleted.emit(user);
    console.log('user-cards onDelete', user);
  }
}
