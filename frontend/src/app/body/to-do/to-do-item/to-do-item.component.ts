import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToDo} from "../to-do.service";

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.css']
})
export class ToDoItemComponent implements OnInit {

  @Input() item: ToDo = Input();
  @Output() onColorChange = new EventEmitter<ToDo>();
  @Output() onDelete = new EventEmitter<ToDo>();
  @Output() onItemCreated = new EventEmitter<ToDo>();

  constructor() { }

  ngOnInit(): void {
    this.onItemCreated.emit(this.item)
  }

  changeColor(item: ToDo, color: string){
    console.log(item)
    item.color = color;
    this.onColorChange.emit(item);
  }

  removeItem(item: ToDo) {
    this.onDelete.emit(item);
  }
}
