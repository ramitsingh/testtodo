import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListListComponent } from './todolist-list.component';
import { FormsModule }   from '@angular/forms';
const routes: Routes = [
    {
        path: '', component: TodoListListComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes),FormsModule],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TodoListListRoutingModule { }
