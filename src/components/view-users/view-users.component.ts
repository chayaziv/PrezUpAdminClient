import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsersTableComponent } from '../users-table/users-table.component';
import { UserService } from '../../services/user.service';
import { UsersCardsComponent } from "../users-cards/users-cards.component";

@Component({
  selector: 'app-view-users',
  imports: [MatToolbarModule,  UsersTableComponent, UsersCardsComponent],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css',
})
export class ViewUsersComponent implements OnInit {
  users: User[] = [
    // כאן יהיו המשתמשים (או תקבל את המידע הזה ממסד נתונים או שירות)
  ];

  constructor(public userService: UserService) {}
  ngOnInit(): void {
    this.userService.users$.subscribe((users) => {
      this.users = users;
    });

    this.userService.loadUsers();
    console.log(this.users);
  }

  displayAsCards = true; // משתנה שמווסת את התצוגה (כרטיסים או טבלה)

  toggleView() {
    this.displayAsCards = !this.displayAsCards;
  }
}
