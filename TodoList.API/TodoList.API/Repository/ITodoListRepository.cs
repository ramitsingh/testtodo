using System.Collections.Generic;
using TodoList.API.Models;

namespace TodoList.API.Repository
{
    public interface ITodoListRepository
    {
        IEnumerable<TodoDto> GetTodoList();

        TodoDto GetTodo(int id);

        bool TodoExists(int id);

        void AddTodo(TodoDto todo);

        void UpdateTodo(int id, TodoDto todo);

    }
}