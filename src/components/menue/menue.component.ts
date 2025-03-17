import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  imports: [RouterLink, MatToolbarModule, MatIconModule, MatMenuModule],
  selector: 'app-menue',
  templateUrl: './menue.component.html',
  styleUrl: './menue.component.css',
})
export class MenueComponent {
  isAuth: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.isAuth$.subscribe((auth) => {
      this.isAuth = auth;
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
