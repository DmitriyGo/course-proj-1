import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Person} from "../body.component";
import {ToDo} from "../to-do/to-do.service";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Person[]> {
    return this.http.get<Person[]>('https://localhost:7004/api/Person')
      .pipe(tap(result => result.sort((p, t) => p.name < t.name ? -1 : 1)));
  }
  postUser(user: Person): Observable<Person> {
    return this.http.post<Person>('https://localhost:7004/api/Person', user);
  }
  putUser(index: number, user: Person): Observable<Person> {
    return this.http.put<Person>(`https://localhost:7004/api/Person/${index}`, user);
  }
  deleteUser(index: number): Observable<any> {
    return this.http.delete<void>(`https://localhost:7004/api/Person/${index}`);

  }

}
