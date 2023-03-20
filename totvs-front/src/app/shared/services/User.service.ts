import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';

@Injectable({ providedIn: 'root' })
export class UserService {

    apiUrl = 'http://localhost:8080/users';

    
    constructor(
        private httpClient: HttpClient
    ) { }

    public getAll(): Observable<any> {
        return this.httpClient.get(this.apiUrl + "/find/all");
    }

    public importUsers(users: User[]): Observable<any> {
        return this.httpClient.post(this.apiUrl + "/import", users);
    }

    public saveWithErrors(users: User[]): Observable<any> {
        return this.httpClient.post(this.apiUrl + "/save/error", users);
    }

    public save(user: User): Observable<any> {
        return this.httpClient.post<any>(this.apiUrl + "/save", user);
    }

    public delete(id: number): Observable<any> {
        return this.httpClient.get(this.apiUrl + "/delete/" + id);
    }

}