import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-dialog-edit',
  template: `
    <h1 mat-dialog-title>Edit User</h1>
    <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <!-- <mat-form-field>
          <input matInput placeholder="ID" formControlName="id" />
        </mat-form-field> -->
        <mat-form-field>
          <input
            matInput
            placeholder="Login"
            formControlName="login"
            required
          />
        </mat-form-field>
        <mat-form-field>
          <input matInput placeholder="Name" formControlName="name" required />
        </mat-form-field>
        <mat-form-field>
          <input
            matInput
            placeholder="Salary"
            formControlName="salary"
            required
          />
        </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button [mat-dialog-close]="false">Cancel</button>
        <button mat-button type="submit" [mat-dialog-close]="data">Save</button>
      </mat-dialog-actions>
    </form>
  `,
})
export class DialogEditComponent {
  editForm = new FormGroup({
    id: new FormControl(),
    login: new FormControl(),
    name: new FormControl(),
    salary: new FormControl(),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsersServiceService
  ) {
    this.editForm.setValue({
      id: data.user.id,
      login: data.user.login,
      name: data.user.name,
      salary: data.user.salary,
    });
  }

  onSubmit() {
    this.dialogRef.close(this.editForm.value);
  }
}
