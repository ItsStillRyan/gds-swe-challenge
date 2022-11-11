import { Component, OnInit } from '@angular/core';
import { USERS } from 'src/app/model/users-mock'
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = USERS;

  constructor() { }

  ngOnInit(): void {
  }

}
