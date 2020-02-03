import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListDetailComponent } from './todolist-detail.component';
import { FormsModule }   from '@angular/forms';
const routes: Routes = [
    {
        path: '', component: TodoListDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes),FormsModule],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TodoListDetailRoutingModule { }
