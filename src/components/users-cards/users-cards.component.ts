import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-users-cards',
  imports: [CommonModule,  MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './users-cards.component.html',
  styleUrl: './users-cards.component.css'
})
export class UsersCardsComponent {
  @Input() users: User[] = [];

  constructor(public userService: UserService) {}
 

  expanded = false;

  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
