import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

const baseUrl = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/`)
  }
  get(id: any): Observable<User> {
    return this.http.get(`${baseUrl}/${id}`)
  }
  update(id: string, user: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${baseUrl}/${user.id}`;
    const body = [
      {
        "op": "replace",
        "path": "/id",
        "value": user.id
      },
      {
        "op": "replace",
        "path": "/login",
        "value": user.login
      },
      {
        "op": "replace",
        "path": "/name",
        "value": user.name
      },
      {
        "op": "replace",
        "path": "/salary",
        "value": user.salary
      }
    ];
    return this.http.patch<User>(url, body, { headers });
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`)
  }
  findById(id: any): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/${id}`)
  }
}
