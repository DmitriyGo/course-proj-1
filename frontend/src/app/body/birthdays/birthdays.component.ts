import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Person} from "../body.component";
import {PersonService} from "../my-table/person.service";
import {ModalService} from "../../_modal";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.css']
})
export class BirthdaysComponent implements OnInit {

  form!: FormGroup;

  _persons: Person[] = []

  _shownPersons: Person[] = []
  _shownPersonsCount: number = 9;

  _pagesCount!: number[];

  _pageNumber: number = 1

  constructor(private personService: PersonService, private modalService: ModalService) {
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  ngOnInit() {
    this.loadPeople().then(u => {
      this.setShownPersons();
      this._pagesCount = new Array(Math.ceil(this._persons.length / this._shownPersonsCount)).fill(1).map((a,i)=>++i)

      console.log(this._pagesCount)
    });
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [Validators.minLength(9), Validators.required]),
      birthday: new FormControl('', Validators.required),
    })
  }

  async loadPeople(){
    this._persons = await firstValueFrom(this.personService.getUsers())

    this._persons = this._persons.sort((a, b) => this.magicDates(a.birthday).getTime() - this.magicDates(b.birthday).getTime())
  }

  magicDates(input: Date): Date {
    const today = new Date();

    const date = new Date(today.getFullYear(), new Date(input).getMonth(), new Date(input).getDate());
    if (date < today)
      date.setFullYear(date.getFullYear() + 1);
    return date;
  }

  async postPerson() {
    console.log(this.form)

    this.personService.postUser({
      personId: 0,
      name: this.form.value.name,
      email: this.form.value.email,
      phoneNumber: this.form.value.phone,
      birthday: this.form.value.birthday,
      friends: [0],
      kinship: 'friend',
      workingPlace: 'not specified',
      editionTime: new Date()
    }).subscribe(u => {
      this.loadPeople().then(u => {
        this.setShownPersons()
        this.form.reset()
        this.form.markAsUntouched()
      });
    })
  }

  setShownPersons(){
    if(this._persons.length - (this._pageNumber * this._shownPersonsCount) < 0){
      this._shownPersons = this._persons.slice((this._pageNumber - 1) * this._shownPersonsCount, this._persons.length+1)
    }else{
      this._shownPersons = this._persons.slice((this._pageNumber - 1) * this._shownPersonsCount, this._pageNumber * this._shownPersonsCount)
    }

  }

  changePage(inc: number){
    if(inc == -1 && this._pageNumber > 1){
      --this._pageNumber;
      this.setShownPersons();
    }
    if(inc == 1 && this._pageNumber < this._pagesCount.length){
      ++this._pageNumber;
      this.setShownPersons();
    }
  }

  removePerson(personId: number) {
    this.personService.deleteUser(personId).subscribe(u => {
      this.loadPeople().then(u => {
        this.setShownPersons()
      });
    })
  }

}
