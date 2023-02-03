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
  update(id: string, patch: any[]) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(`${baseUrl}/${id}`, { headers });
  }
  delete(id: any): Observable<any>{
    return this.http.delete(`${baseUrl}/${id}`)
  }
  findById(id: any): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/${id}`)
  }
}
