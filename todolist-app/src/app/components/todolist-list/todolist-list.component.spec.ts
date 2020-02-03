/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoListListComponent } from './todolist-list.component';
import { TodoListService } from 'src/app/services/todolist.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('TodolistListComponent', () => {
  let component: TodoListListComponent;
  let fixture: ComponentFixture<TodoListListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule],
      providers:[TodoListService],
      declarations: [ TodoListListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
