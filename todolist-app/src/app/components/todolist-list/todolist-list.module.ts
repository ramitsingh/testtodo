import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { TodoListListRoutingModule } from './todolist-list-routing.module';
import { TodoListListComponent } from './todolist-list.component';
import { TodoListService } from '../../services/todolist.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TodoListListRoutingModule
  ],
  declarations: [TodoListListComponent],
  providers: [
    TodoListService
  ]
})
export class TodoListListModule { }
