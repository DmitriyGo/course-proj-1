import {Component, OnDestroy, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ModalService} from "../../_modal";
import {ToDo, ToDoService} from "./to-do.service";
import {firstValueFrom, map} from "rxjs";

@Component({
  selector: 'app-to-do', templateUrl: './to-do.component.html', styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  color: string = '#987987'

  bodyText: string = '';

  allTodos: ToDo[] = [];

  todo: ToDo[] = [];
  done: ToDo[] = [];

  item!: ToDo;

  constructor(private modalService: ModalService, private todoService: ToDoService) {
  }

  ngOnInit() {
    this.loadTodos()
  }

  async loadTodos() {
    this.allTodos =  await firstValueFrom (this.todoService.getTodos())
    this.todo = this.allTodos.filter(t => !t.status)
    this.done = this.allTodos.filter(t => t.status)
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  async drop(item: CdkDragDrop<any[]>) {
    console.log(item)
    if (item.previousContainer === item.container) {
      moveItemInArray(item.container.data, item.previousIndex, item.currentIndex);
    } else {
      transferArrayItem(item.previousContainer.data, item.container.data, item.previousIndex, item.currentIndex,);
      if (item.container.id == "cdk-drop-list-1") {
        for (const item1 of item.container.data) {
          if (!item1.status) {
            await firstValueFrom(this.todoService.putChangeStatusTodo(item1.toDoId, item1))
            this.done[this.done.findIndex(e => e.toDoId == item1.toDoId)] = await firstValueFrom(this.todoService.getSingleTodo(item1.toDoId))
          }
        }
      }
      if (item.container.id == "cdk-drop-list-0") {
        for (const item1 of item.container.data) {
          if (item1.status) {
            await firstValueFrom(this.todoService.putChangeStatusTodo(item1.toDoId, item1))
            this.todo[this.todo.findIndex(e => e.toDoId == item1.toDoId)] = await firstValueFrom(this.todoService.getSingleTodo(item1.toDoId))
          }
        }
      }

    }
  }


  deleteItem($event: ToDo) {
    this.done = this.done.filter(i => i.toDoId != $event.toDoId)
    this.todoService.deleteTodo($event.toDoId).subscribe()
  }


  postTodo(value: string): void {

    this.todoService.postTodo({
      toDoId: 0,
      status: false,
      color: "#18191D",
      text: `${value}`
    }).subscribe(item => {
      console.log(item)
      this.loadTodos();
    })
  }

  putTodo(id: number, todo: ToDo): void {
    this.todoService.putTodo(id, todo)
      .subscribe(item => {
        //this.loadTodos()
        console.log(item)
        this.todo[this.todo.indexOf(item)]=item;
      })
  }

  setItem(item: ToDo) {
    this.item = item
  }
}
