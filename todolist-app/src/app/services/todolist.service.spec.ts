/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { TodoListService } from './todolist.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

describe('TodoListService', () => {
  let httpClientSpy: { get: jasmine.Spy, put: jasmine.Spy };
  //let httpClient: HttpClient;
  // let httpTestingController: HttpTestingController;
  let todoListService: TodoListService;
  let todolist = [
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoListService]
    });
    // httpClient = TestBed.inject(HttpClient);
    // httpTestingController = TestBed.inject(HttpTestingController);
    // todoListService = TestBed.inject(TodoListService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get','put','post']);
    todoListService = new TodoListService(<any>httpClientSpy);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    //httpTestingController.verify();
  });

  it('should ...', inject([TodoListService], (service: TodoListService) => {
    expect(service).toBeTruthy();
  }));

  it('should return active todolist (HttpClient called once)', inject([TodoListService], (service: TodoListService) => {

    let expectedActiveTodos = todolist.filter(x => x.isCompleted === false);
    httpClientSpy.get.and.returnValue(of(expectedActiveTodos));

    todoListService.getTodos().subscribe(
      todos => expect(todos).toEqual(expectedActiveTodos, 'expected todos'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  }));

  // it('should return an error when the server returns a 404', () => {
  //   const errorResponse = new HttpErrorResponse({
  //     error: 'test 404 error',
  //     status: 404, statusText: 'Not Found'
  //   });

  //   httpClientSpy.get.and.returnValue(of(errorResponse));

  //   todoListService.getTodos().subscribe(
  //     todos => fail('expected an error, not todos'),
  //     error => expect(error.message).toContain('test 404 error')
  //   );
  // });

  it('should return completed todolist', inject([TodoListService], (service: TodoListService) => {
    let expectedCompletedTodos = todolist.filter(x => x.isCompleted === true);
    httpClientSpy.get.and.returnValue(of(expectedCompletedTodos));

    todoListService.getCompletedTodos().subscribe(
      todos => expect(todos).toEqual(expectedCompletedTodos, 'expected todos'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  }));

  it('should return todo by id', inject([TodoListService], (service: TodoListService) => {
    let todoById = todolist[0];
    httpClientSpy.get.and.returnValue(of(todoById));

    todoListService.getTodoById(1).subscribe(
      todo => expect(todo).toEqual(todoById, 'expected todo'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  }));

  it('should return updated todo by id', inject([TodoListService], (service: TodoListService) => {
    expect(service).toBeTruthy();
  }));

  it('should save new todo', inject([TodoListService], (service: TodoListService) => {
    expect(service).toBeTruthy();
  }));

  it('should mark complete todo', inject([TodoListService], (service: TodoListService) => {
    let todoById = todolist[0];
    httpClientSpy.put.and.returnValue(of(todoById));

    todoListService.markCompleteTodoDetail(todoById).subscribe(
      todo => expect(todo).toEqual(todoById, 'expected todo'),
      fail
    );
    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  }));

});
