import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm} from '@angular/forms';

import { TodoListDetailRoutingModule } from './todolist-detail-routing.module';
import { TodoListDetailComponent } from './todolist-detail.component';
import { TodoListService } from '../../services/todolist.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TodoListDetailRoutingModule
  ],
  exports:[FormsModule],
  declarations: [TodoListDetailComponent],
  providers: [
    TodoListService
  ]
})
export class TodoListDetailModule { }
