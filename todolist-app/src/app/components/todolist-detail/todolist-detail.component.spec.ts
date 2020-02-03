/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoListDetailComponent } from './todolist-detail.component';
import { FormsModule } from '@angular/forms';
import { TodoListService } from 'src/app/services/todolist.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('TodoListDetailComponent', () => {
  let component: TodoListDetailComponent;
  let fixture: ComponentFixture<TodoListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule,HttpClientTestingModule], 
       providers:[TodoListService],
      declarations: [ TodoListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
