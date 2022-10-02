import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';

import {PersonService} from "./person.service";
import {firstValueFrom} from "rxjs";
import {Person} from "../body.component";
import {ModalService} from "../../_modal";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MyTableComponent implements OnInit {

  @Output() onPersonPut = new EventEmitter<Person>();
  form!: FormGroup;
  putForm!: FormGroup;

  _filter: string = '';

  _persons: Person[] = []

  _shownPersons: Person[] = []
  _shownPersonsCount: number = 7;

  _pagesCount!: number[];

  _pageNumber: number = 1
  currentPersonId!: number;

  constructor(private personService: PersonService, private modalService: ModalService) {
  }

  openModal(id: string, person?: Person) {
    this.modalService.open(id);
    if (id == 'person-edit-modal') {
      this.putForm.value.name = person?.name
      console.log(this.putForm.controls['name'])
      if(person){
        this.putForm.controls['personId'].setValue(person.personId)
        this.putForm.controls['name'].setValue(person.name)
        this.putForm.controls['email'].setValue(person.email)
        this.putForm.controls['phone'].setValue(person.phoneNumber)
        this.putForm.controls['kinship'].setValue(person.kinship)
        this.putForm.controls['workingPlace'].setValue(person.workingPlace)
        this.putForm.controls['birthday'].setValue(person.birthday)
        console.log(this.putForm)
      }

    }


  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  ngOnInit() {
    this.loadPeople().then(u => {
      this.setShownPersons();
      this._pagesCount = new Array(Math.ceil(this._persons.length / this._shownPersonsCount)).fill(1).map((a, i) => ++i)

      console.log(this._pagesCount)
    });
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [Validators.minLength(9), Validators.required]),
      birthday: new FormControl('', Validators.required),
    })
    this.putForm = new FormGroup({
      personId: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [Validators.minLength(9), Validators.required]),
      kinship: new FormControl('', Validators.required),
      workingPlace: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
    })
  }

  async loadPeople() {
    this._persons = await firstValueFrom(this.personService.getUsers())
    this._persons = this._persons.sort((a, b) => {
      return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
    })

  }

  async postPerson() {
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

  async putPerson() {
    this.personService.putUser(this.putForm.value.personId, {
      personId: 0,
      name: this.putForm.value.name,
      email: this.putForm.value.email,
      phoneNumber: this.putForm.value.phone,
      birthday: this.putForm.value.birthday,
      friends: [0],
      kinship: this.putForm.value.kinship,
      workingPlace: this.putForm.value.workingPlace,
      editionTime: new Date()
    }).subscribe(u => {
      this.loadPeople().then(u => {
        this.setShownPersons()
        this.form.reset()
        this.form.markAsUntouched()
      });
    })
  }

  setShownPersons() {
    if (this._persons.length - (this._pageNumber * this._shownPersonsCount) < 0) {
      this._shownPersons = this._persons.slice((this._pageNumber - 1) * this._shownPersonsCount, this._persons.length + 1)
    } else {
      this._shownPersons = this._persons.slice((this._pageNumber - 1) * this._shownPersonsCount, this._pageNumber * this._shownPersonsCount)
    }

  }

  changePage(inc: number) {
    if (inc == -1 && this._pageNumber > 1) {
      --this._pageNumber;
      this.setShownPersons();
    }
    if (inc == 1 && this._pageNumber < this._pagesCount.length) {
      ++this._pageNumber;
      this.setShownPersons();
    }
  }

  filterPerson($event: Event) {
    let a = $event as InputEvent;
    if (a.data != null) {
      this._filter += a.data
    } else {
      this._filter = this._filter.slice(0, this._filter.length - 1)
    }
    this._shownPersons = this._persons.filter(p => p.name.toUpperCase().includes(this._filter.toUpperCase()) ||
      p.email.toUpperCase().includes(this._filter.toUpperCase()) ||
      p.birthday.toString().toUpperCase().includes(this._filter.toUpperCase()) ||
      p.phoneNumber.toString().toUpperCase().includes(this._filter.toUpperCase()))

    if (this._shownPersons.length - (this._pageNumber * this._shownPersonsCount) < 0) {
      this._shownPersons = this._shownPersons.slice((this._pageNumber - 1) * this._shownPersonsCount, this._persons.length + 1)
    } else {
      this._shownPersons = this._shownPersons.slice((this._pageNumber - 1) * this._shownPersonsCount, this._pageNumber * this._shownPersonsCount)
    }
  }

  editPerson(personId: number) {

  }

  removePerson(personId: number) {
    this.personService.deleteUser(personId).subscribe(u => {
      this.loadPeople().then(u => {
        this.setShownPersons()
      });
    })
  }


  setCurrentPersonId(personId: number) {
    this.onPersonPut.emit(this._persons[personId])
    this.openModal('person-edit-modal')
  }

  sortTable(type: string) {
      if(type == 'name'){
        this._persons = this._persons.sort((a, b) => {
          return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
        })
      }
      if(type == 'time'){
        this._persons = this._persons.sort((a, b) => {
          return a.editionTime > b.editionTime ? 1 : -1;
        })
      }
      this.setShownPersons()
  }
}
