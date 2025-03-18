import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { User } from '../../models/user.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  userForm: FormGroup;
  isEdit: boolean;
  roleUser = 'user';
  roleAdmin = 'admin';
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User; isEdit: boolean }
  ) {
    this.isEdit = data.isEdit;

    this.userForm = this.fb.group({
      name: [
        { value: data.user?.name || '', disabled: this.isEdit },
        Validators.required,
      ],
      email: [
        { value: data.user?.email || '', disabled: this.isEdit },
        [Validators.required, Validators.email],
      ],
      password: [
        { value: data.user?.password || '', disabled: this.isEdit },
        [Validators.required],
      ],
      role: [data.user?.role.roleName],
      accountStatus: [data.user?.accountStatus],
    });
  }
  onSave() {
    if (this.userForm.valid) {
      this.dialogRef.close({
        action: 'save',
        data: this.userForm.getRawValue(),
      });
    }
  }
  onCancel() {
    console.log('cancel');
    this.dialogRef.close({ action: 'cancel' });
  }
}
