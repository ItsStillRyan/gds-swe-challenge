import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/User';
import { USERS } from 'src/app/model/users-mock';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns = ['Id', 'Login', 'Name', 'Salary']
  dataSource = new MatTableDataSource<User>(USERS)

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() user!: User

  constructor() { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
