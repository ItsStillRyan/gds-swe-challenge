import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/User';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  displayedColumns = ['id', 'login', 'name', 'salary', 'delete', 'update'];

  users?: User[];
  currentUser: User = {};
  currentIndex = -1;
  name: string;
  dataSource: MatTableDataSource<User>;
  id: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  filterForm = new FormGroup({
    maximum: new FormControl(),
    minimum: new FormControl(),
  });

  get maximum() {
    return this.filterForm.get('maximum').value;
  }
  get minimum() {
    return this.filterForm.get('minimum').value;
  }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  constructor(
    private userService: UsersServiceService,
    public dialog: MatDialog
  ) {}

  retrieveUsers(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // Salary filter
        this.dataSource.filterPredicate = (data, filter) => {
          if (this.minimum && this.maximum) {
            console.log('filtered');
            return data.salary >= this.minimum && data.salary <= this.maximum;
          }
          console.log('not filtered');
          return true;
        };
      },
      error: (e) => console.error(e),
    });
  }

  applyFilter() {
    console.log('triggered');
    this.dataSource.filter = '' + Math.random();
  }

  deleteUser(user: User) {
    this.userService.delete(user).subscribe(() => {
      this.users = this.users.filter((t) => t.id !== user.id);
      this.retrieveUsers();
    });
  }

  updateUser(user: User) {
    this.userService
      .update(user.id, [
        { op: 'replace', path: '/id', value: user.id},
        { op: 'replace' ,path: '/login', value: user.login},
        { op: 'replace', path: '/name', value: user.name },
        { op: 'replace', path: '/salary', value: user.salary },
      ])
      .subscribe(() => {
        this.retrieveUsers();
      });
  }

  confirmDialog(id): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(id);
      }
    });
  }

  openUpdateDialog(user: User) {
    const dialogRef = this.dialog.open(DialogEditComponent, {
      data: { user },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateUser(result);
      }
    });
  }
}
