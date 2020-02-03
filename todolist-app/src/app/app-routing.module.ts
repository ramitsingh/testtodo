import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'todolist-list',
    pathMatch: 'full'
  },
  {
    path: 'todolist-list',
    loadChildren: './components/todolist-list/todolist-list.module#TodoListListModule'
  },
  {
    path: 'todolist-detail',
    loadChildren: './components/todolist-detail/todolist-detail.module#TodoListDetailModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }
