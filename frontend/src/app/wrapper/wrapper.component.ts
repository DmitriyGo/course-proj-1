import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  constructor() { }
  title: string = 'Contacts'

  ngOnInit(): void {
  }

  setTitle($event: string) {
    this.title = $event;
  }
}
