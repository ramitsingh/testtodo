import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TodoListService } from '../../services/todolist.service';
import { ITodoList } from '../../model/todolist';


@Component({
  selector: 'app-todolist-detail',
  templateUrl: './todolist-detail.component.html',
  styleUrls: ['./todolist-detail.component.css']
})
export class TodoListDetailComponent implements OnInit {

  public todoId: string;
  public todoDetail = <ITodoList>{};
  public mode: string;
  public minDate:Date;
  errorMessage:string;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private todoService: TodoListService) { 
    this.minDate = new Date();
    this.minDate.setHours(0, 0, 0, 0);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.todoId = params['id'];
      if (this.todoId !== undefined) {
        console.log(this.todoId);
        this.getTodoDetailById(this.todoId);
        this.mode = 'Edit';
      } else {
        // this.todoId = null;
        console.log(this.todoId);
        this.todoDetail['id'] = 0;
        this.mode = 'Add';
      }
    });
  }

  getTodoDetailById(id) {
     this.todoService.getTodoById(parseInt(id)).subscribe({
      next: todo => this.todoDetail = todo,
      error: err => this.errorMessage = err
    });;
    console.log(this.todoDetail);
  }

  onTodoSubmitForm(form) {
    console.log(form);
    if (form.valid) {
      this.todoService.updateTodoById(this.todoDetail).subscribe();
      this.router.navigate(['/todolist-list'], {queryParams: {isCompleted: false}});
    } else {

    }
  }
  onClickCancel() {
    this.router.navigate(['/todolist-list'],  {queryParams: {isCompleted: false}});
  }

}
