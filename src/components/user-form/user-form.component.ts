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
  roles = ['admin', 'user']; // רשימת תפקידים לדוגמה
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
        this.isEdit ? '' : '',
        this.isEdit ? [] : [Validators.required, Validators.minLength(6)],
      ],
      role: [this.roleUser || '', Validators.required],
      accountStatus: [data.user?.accountStatus || 'Active'],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.getRawValue());
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  // @Input() user: User | null = null;
  // @Output() userSaved = new EventEmitter<User>();
  // @Output() cancel = new EventEmitter<void>();

  // userForm: FormGroup;
  // isEdit: boolean = false;
  // roles = ['Admin', 'Instructor', 'Student']; // רשימה לדוגמה

  // constructor(private fb: FormBuilder) {
  //   this.userForm = this.fb.group({
  //     name: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: [
  //       '',
  //       this.isEdit ? [] : [Validators.required, Validators.minLength(6)],
  //     ],
  //     role: ['', Validators.required],
  //     accountStatus: ['Active'],
  //   });
  // }

  // ngOnInit() {
  //   if (this.user) {
  //     this.isEdit = true;
  //     this.userForm.patchValue({
  //       email: this.user.email,
  //       // role: this.user.role,
  //       accountStatus: this.user.accountStatus,
  //     });

  //     // מנקה את השדות שלא צריכים להיות זמינים בעריכה
  //     this.userForm.get('name')?.disable();
  //     this.userForm.get('password')?.disable();
  //   }
  // }

  // onSubmit() {
  //   if (this.userForm.valid) {
  //     this.userSaved.emit(this.userForm.getRawValue());
  //   }
  // }

  // onCancel() {
  //   this.cancel.emit();
  // }
}
