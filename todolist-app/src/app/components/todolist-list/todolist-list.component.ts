import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITodoList } from '../../model/todolist';
import { TodoListService } from '../../services/todolist.service';

@Component({
  selector: 'app-todolist-list',
  templateUrl: './todolist-list.component.html',
  styleUrls: ['./todolist-list.component.css']
})
export class TodoListListComponent implements OnInit {

  public todoLists: ITodoList[] = [];
  public filteredTodos: ITodoList[] = [];
    constructor( private router: Router, private todoListService: TodoListService ) { }
    errorMessage = '';
    ngOnInit() {
        this.loadAllTodoList();    
    }
    loadAllTodoList() {
         this.todoListService.getTodos().subscribe({
            next: todos => {
                this.todoLists  = todos;
                //this.filteredTodos = this.todos;
              },
              error: err => this.errorMessage = err   
        }
        );
    }
    
    onClickEditTodoDetail(id) {
        console.log(id);
        this.router.navigate(['/todolist-detail'], {queryParams: {id: id}});
    }
    
    onClickActiveTodo() {
        this.loadAllTodoList();
    }
    onClickCompletedTodo() {
        this.todoListService.getCompletedTodos().subscribe({
            next: todos => {
                this.todoLists  = todos;
              },
              error: err => this.errorMessage = err   
        }
        );
    }
    
    onClickTodoMarkComplete(todo) {
        this.todoListService.markCompleteTodoDetail(todo).subscribe();
        this.loadAllTodoList(); 
    }

}
