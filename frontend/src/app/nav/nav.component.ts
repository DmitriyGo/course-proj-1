import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faUsers, faUser, faBox, faHatWizard} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  index = 0;

  @Output() onSendTitle = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  addClass(i: number){
    this.index = i;
  }

  sendTitle(title: string){
    this.onSendTitle.emit(title)
  }



}
