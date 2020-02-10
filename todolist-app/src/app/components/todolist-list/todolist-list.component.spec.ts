/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoListListComponent } from './todolist-list.component';
import { TodoListService } from 'src/app/services/todolist.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ITodoList } from 'src/app/model/todolist';
//import { Observable } from 'rxjs';

describe('TodolistListComponent', () => {
  let component: TodoListListComponent;
  let fixture: ComponentFixture<TodoListListComponent>;
  let todolist: ITodoList[];
  let mockTodoListService;
  let router;

  beforeEach(async(() => {
    todolist = [
      {
        "id": 1,
        "task": "Daily Standup",
        "details": "Project xyz daily standup",
        "dueDate": new Date(),
        "repeate": "N",
        "isCompleted": false
      },
      {
        "id": 2,
        "task": "C# interview",
        "details": "Call xyz candidate",
        "dueDate": new Date(),
        "repeate": "Y",
        "isCompleted": false
      },
      {
        "id": 3,
        "task": "Code Review",
        "details": "Peer Code Review",
        "dueDate": new Date(),
        "repeate": "N",
        "isCompleted": false
      },
      ,
      {
        "id": 4,
        "task": "Code Review",
        "details": "Peer Code Review",
        "dueDate": new Date(),
        "repeate": "N",
        "isCompleted": true
      }
    ];
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [TodoListService],
      declarations: [TodoListListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    todolist = [
      {
        "id": 1,
        "task": "Daily Standup",
        "details": "Project xyz daily standup",
        "dueDate": new Date(),
        "repeate": "N",
        "isCompleted": false
      },
      {
        "id": 2,
        "task": "C# interview",
        "details": "Call xyz candidate",
        "dueDate": new Date(),
        "repeate": "Y",
        "isCompleted": false
      },
      {
        "id": 3,
        "task": "Code Review",
        "details": "Peer Code Review",
        "dueDate": new Date(),
        "repeate": "N",
        "isCompleted": false
      },
      ,
      {
        "id": 4,
        "task": "Code Review",
        "details": "Peer Code Review",
        "dueDate": new Date(),
        "repeate": "N",
        "isCompleted": true
      }
    ];
    fixture = TestBed.createComponent(TodoListListComponent);
    //component = fixture.componentInstance;
    mockTodoListService = jasmine.createSpyObj(['getTodos', 'getCompletedTodos', 'getTodoById', 'updateTodoById', 'markCompleteTodoDetail']);
    component = new TodoListListComponent(router, mockTodoListService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all active todo list', () => {
    let active = todolist.filter(x => x.isCompleted === false);
    mockTodoListService.getTodos.and.returnValue(of(active));
    component.todoLists = active;
    component.loadAllTodoList();
    expect(component.todoLists.length).toBe(3);
  });

  it('should load all completed todo list', () => {
    let completed = todolist.filter(x => x.isCompleted === true);
    mockTodoListService.getCompletedTodos.and.returnValue(of(completed));
    component.todoLists = completed;
    component.onClickCompletedTodo();
    expect(component.todoLists.length).toBe(1);
  });

});
