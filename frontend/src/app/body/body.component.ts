import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PersonService} from "./my-table/person.service";

export interface Person{
  personId: number,
  name: string,
  birthday: Date,
  email: string,
  phoneNumber: number,
  kinship: string,
  friends: number[],
  workingPlace: string,
  editionTime: Date
}

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class BodyComponent implements OnInit {
  constructor(private personService: PersonService) { }
  @Input() bodyTitle = 'Contacts';

  ngOnInit(): void {
  }

}
