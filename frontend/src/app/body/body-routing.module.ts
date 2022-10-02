import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MyTableComponent} from "./my-table/my-table.component";
import {BirthdaysComponent} from "./birthdays/birthdays.component";
import {ToDoComponent} from "./to-do/to-do.component";
import {CalendarComponent} from "./calendar/calendar.component";

const routes: Routes = [
  {path: 'contacts', component: MyTableComponent},
  {path: '', component: MyTableComponent},
  {path: 'birthdays', component: BirthdaysComponent},
  {path: 'todo', component: ToDoComponent},
  {path: 'calendar', component: CalendarComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class BodyRoutingModule {

}
