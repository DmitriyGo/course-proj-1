import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Person} from "../body.component";
import {ToDo} from "../to-do/to-do.service";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }

  getEvent(id: string): Observable<{'start': string, 'title': string}> {
    return this.http.get<{'start': string, 'title': string}>(`https://localhost:7004/api/Events/${id}`)
  }
  // postUser(user: Person): Observable<Person> {
  //   return this.http.post<Person>('https://localhost:7004/api/Person', user);
  // }
  // deleteUser(index: number): Observable<any> {
  //   return this.http.delete<void>(`https://localhost:7004/api/Person/${index}`);
  // }

}
