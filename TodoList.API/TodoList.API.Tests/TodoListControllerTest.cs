using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TodoList.API.Controllers;
using TodoList.API.Models;
using TodoList.API.Repository;
using Xunit;

namespace TodoList.API.Tests
{
    public class TodoListControllerTest
    {
        private readonly ITodoListRepository _todoListRepository;
        TodoListController _controller;

        public TodoListControllerTest()
        {
            // Arrange
            _todoListRepository = new TodoListDataStore();
            _controller = new TodoListController(_todoListRepository);
        }
        [Fact]
        public void Get_WhenCalled_ReturnsOkResult()
        {
            // Act
            var okResult = _controller.GetTodoListByStatus(false);

            // Assert
            Assert.IsType<OkObjectResult>(okResult);
        }

        [Fact]
        public void Get_WhenCalled_ReturnsAllItems()
        {
            // Act
            var okResult =  _controller.GetTodoListByStatus(false) as OkObjectResult;

            // Assert
            var okActualResult = Assert.IsType<OkObjectResult>(okResult).Value;
            var todoList = Assert.IsType<List<TodoDto>>(okActualResult);
            //Assert.Equal(2, todoList.Count);
        }
    }
}
