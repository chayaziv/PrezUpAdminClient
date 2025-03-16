import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// import { Router } from '@angular/router';
import { loginUser } from '../../models/loginUser.model';
// import { AuthService } from '../../services/auth.service';
// import { Component, OnInit } from '@angular/core';
// import {
//   FormGroup,
//   FormBuilder,
//   Validators,
//   ReactiveFormsModule,
// } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { SignInUser } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
// import { ButtonStyleDirective } from '../../directives/button-style.directive';
@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) {
    this.signInForm = this.fb.group({
      password: [
        '',
        [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)],
      ],
      email: ['', Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)],
    });
  }
  SaveUser() {
    const user: loginUser = this.signInForm?.value as loginUser;

    this.authService.SignIn(user);
  }
}
