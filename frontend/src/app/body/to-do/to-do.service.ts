import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

export interface ToDo {
  toDoId: number
  text: string
  status: boolean
  color: string
}

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http: HttpClient) { }

  getTodos():  Observable<ToDo[]>{
    return this.http.get<ToDo[]>('https://localhost:7004/api/ToDo');
  }
  getSingleTodo(id: number):  Observable<ToDo>{
    return this.http.get<ToDo>(`https://localhost:7004/api/ToDo/${id}`);
  }

  postTodo(todo: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>('https://localhost:7004/api/ToDo', todo);
  }

  deleteTodo(index: number): Observable<any> {
    return this.http.delete<void>(`https://localhost:7004/api/ToDo/${index}`);

  }

  putChangeStatusTodo(id: number, todo: ToDo): Observable<ToDo> {
    return this.http.put<ToDo>(`https://localhost:7004/api/ToDo/${id}`, {
      color: "#18191D",
      text: todo.text,
      status: !todo.status
    })
  }
  putTodo(id: number, todo: ToDo): Observable<ToDo> {
    return this.http.put<ToDo>(`https://localhost:7004/api/ToDo/${id}`, {
      color: todo.color,
      text: todo.text,
      status: todo.status
    })
  }

}
