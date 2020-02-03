import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders , HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ITodoList } from '../model/todolist';

@Injectable()
export class TodoListService {
  public todoLists: ITodoList[] = [];
  private todoUrl = 'http://localhost:54200/api/todolist/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getTodos(): Observable<ITodoList[]> {

   return this.http.get<ITodoList[]>(`${this.todoUrl}?isCompleted=false`,this.httpOptions)
   .pipe(
     tap(data => console.log('All: ' + JSON.stringify(data))),
     catchError(this.handleError)
   );
}

getCompletedTodos(): Observable<ITodoList[]> {

  return this.http.get<ITodoList[]>(this.todoUrl+'?isCompleted=true',this.httpOptions)
  .pipe(
    tap(data => console.log('All: ' + JSON.stringify(data))),
    catchError(this.handleError)
  );
        
    }
getTodoById(id: number): Observable<ITodoList> {
   return this.http.get<ITodoList>(this.todoUrl + id,this.httpOptions)
    .pipe(
        tap(data => console.log('Id: ' + JSON.stringify(data))),
        catchError(this.handleError)
        );
}

updateTodoById(todo): Observable<ITodoList> {
    if (todo.id === 0) { 
      return this.http.post<ITodoList>(this.todoUrl, todo,this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );              
        
    } else {
      
        return this.http.put<ITodoList>(this.todoUrl + todo.id, todo)
          .pipe(
            catchError(this.handleError)
          );
      
    }
}

markCompleteTodoDetail(todo) {
  todo.isCompleted=true;
  return this.http.put<ITodoList>(this.todoUrl + todo.id, todo,this.httpOptions)
          .pipe(
            catchError(this.handleError)
          );   
}

private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
