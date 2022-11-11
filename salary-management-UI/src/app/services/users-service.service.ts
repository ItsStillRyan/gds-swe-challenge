import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:8080/api/employees';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl)
  }

  get(id: any): Observable<User> {
    return this.http.get(`${baseUrl}/${id}`)
  }
  update(id: any, data: any): Observable<any>{
    return this.http.patch(`${baseUrl}/${id}`, data);
  }
  delete(id: any): Observable<any>{
    return this.http.delete(`${baseUrl}/${id}`)
  }
  findById(id: any): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/${id}`)
  }
}
