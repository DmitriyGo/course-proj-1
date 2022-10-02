import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { BodyComponent } from './body/body.component';
import { NavComponent } from './nav/nav.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { MyTableComponent } from './body/my-table/my-table.component';
import {BodyRoutingModule} from "./body/body-routing.module";
import { BirthdaysComponent } from './body/birthdays/birthdays.component';
import { ToDoComponent } from './body/to-do/to-do.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { ToDoItemComponent } from './body/to-do/to-do-item/to-do-item.component';
import {ModalModule} from "./_modal";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {ScrollingModule} from "@angular/cdk/scrolling";
import { CalendarComponent } from './body/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {ChunkPipe} from "./body/calendar/chunk.pipe";
import {NgxPrintModule} from "ngx-print";
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    BodyComponent,
    NavComponent,
    MyTableComponent,
    BirthdaysComponent,
    ToDoComponent,
    ToDoItemComponent,
    CalendarComponent,
    ChunkPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BodyRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    ModalModule,
    MatCardModule,
    MatTableModule,
    MatTableModule,
    MatIconModule,
    MatExpansionModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
    MatSelectModule,
    MatIconModule,
    MatExpansionModule,
    MatExpansionModule,
    MatIconModule,
    MatIconModule,
    MatProgressBarModule,
    MatIconModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    MatIconModule,
    MatIconModule,
    MatExpansionModule,
    MatExpansionModule,
    MatSelectModule,
    MatExpansionModule,
    MatIconModule,
    MatExpansionModule,
    MatExpansionModule,
    MatSelectModule,
    MatExpansionModule,
    MatExpansionModule,
    MatExpansionModule,
    MatIconModule,
    MatExpansionModule,
    MatIconModule,
    MatExpansionModule,
    MatExpansionModule,
    MatIconModule,
    MatIconModule,
    MatProgressBarModule,
    MatIconModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatIconModule,
    MatTableModule,
    MatTableModule,
    MatTableModule,
    MatExpansionModule,
    MatTableModule,
    MatTableModule,
    MatIconModule,
    MatTableModule,
    MatTableModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MatIconModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
    MatExpansionModule,
    MatExpansionModule,
    MatExpansionModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    ScrollingModule,
    FullCalendarModule,
    NgxPrintModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
