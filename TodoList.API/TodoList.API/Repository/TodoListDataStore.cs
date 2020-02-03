using TodoList.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoList.API.Repository
{
    public class TodoListDataStore:ITodoListRepository
    {
        public static TodoListDataStore Current { get; } = new TodoListDataStore();

        public List<TodoDto> TodoList { get; set; }

        public TodoListDataStore()
        {
            // init dummy data
            TodoList = new List<TodoDto>()
            {
                new TodoDto()
                {
                     Id = 1,
                     Task = "Daily Standup",
                     Details = "Daily Standup 10 AM",
                     DueDate= DateTime.Now,
                     Repeate="N",
                     IsCompleted=false

                },
                new TodoDto()
                {
                     Id = 2,
                     Task = "C# Interview",
                     Details = "Today 11 AM",
                     DueDate= DateTime.Now,
                     Repeate="N",
                     IsCompleted=false
                },
                new TodoDto()
                {
                    Id = 3,
                     Task = "Code Review",
                     Details = "Friday 1 PM",
                     DueDate= DateTime.Now.AddDays(5),
                     Repeate="N",
                     IsCompleted=true

                }
            };
        }

        public IEnumerable<TodoDto> GetTodoList()
        {
            return Current.TodoList;
        }

        public TodoDto GetTodo(int id)
        {
            return Current.TodoList.FirstOrDefault( x=> x.Id==id);
        }

        public bool TodoExists(int id)
        {
            return Current.TodoList.Any(x => x.Id == id);
        }

        public void AddTodo(TodoDto todo)
        {

            // in memory to be improved
            var maxTodoId = Current.TodoList.Max(p => p.Id);

            Current.TodoList.Add(new TodoDto()
            {
                Id = ++maxTodoId,
                Task = todo.Task,
                Details = todo.Details,
                DueDate = todo.DueDate,
                Repeate = todo.Repeate,
                IsCompleted = false
            });


        }

        public void UpdateTodo(int id, TodoDto todo)
        {
            var todoFromStore = Current.TodoList.FirstOrDefault(c => c.Id == id);
            todoFromStore.Task = todo.Task;
            todoFromStore.Details = todo.Details;
            todoFromStore.DueDate = todo.DueDate;
            todoFromStore.IsCompleted = todo.IsCompleted;
        }
    }

}
