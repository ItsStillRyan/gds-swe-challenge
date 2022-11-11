import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/User';
import { USERS } from 'src/app/model/users-mock';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users?: User[]
  currentUser: User = {}
  currentIndex = -1;
  name = '';
  dataSource: MatTableDataSource<User>;

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        console.log(data)
        this.dataSource = new MatTableDataSource<User>(this.users)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data, filter) => {
          if (this.minimum && this.maximum) {
            console.log("filtered")
            return data.salary >= this.minimum && data.salary <= this.maximum;
          }
          console.log("not filtered")
          return true;
        }
      },
      error: (e) => console.error(e)
    })
    // this.retrieveUsers();
  }

  constructor(private userService: UsersServiceService) {

  }

  // retrieveUsers(): void {
  //   this.userService.getAll().subscribe({
  //     next: (data) => {
  //       this.users = data;
  //       console.log(data)
  //       this.dataSource = new MatTableDataSource<User>(this.users)
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
  //     },
  //     error: (e) => console.error(e)
  //   })
  // }

  displayedColumns = ['id', 'login', 'name', 'salary'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  filterForm = new FormGroup({
    maximum: new FormControl(),
    minimum: new FormControl()
  });

 get maximum() { return this.filterForm.get('maximum').value }
 get minimum() { return this.filterForm.get('minimum').value }

  applyFilter() {
    console.log("triggered")
    this.dataSource.filter = '' + Math.random();
  }

}
