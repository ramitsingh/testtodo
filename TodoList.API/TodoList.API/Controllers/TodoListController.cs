using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using TodoList.API.Models;
using TodoList.API.Repository;

namespace TodoList.API.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    [ApiController]
    public class TodoListController : ControllerBase
    {
        private readonly ITodoListRepository _todoListRepository;
        public TodoListController(ITodoListRepository todoListRepository)
        {
            _todoListRepository= todoListRepository?? throw new ArgumentNullException(nameof(todoListRepository));
        }
       
        [HttpGet]
        public IActionResult GetTodoListByStatus([FromQuery(Name = "isCompleted")]
        bool isCompleted)
        {
            return Ok(_todoListRepository.GetTodoList().Where(x=> x.IsCompleted==isCompleted));
        }

        

        // GET 5
        [HttpGet("{id}")]
        public IActionResult GetTodo(int id)
        {
            // find city
            if (_todoListRepository.TodoExists(id))
            {
                return Ok(_todoListRepository.GetTodo(id));
            }
            else
            {
                return NotFound();
            }

            
        }

        [HttpPost]
        public IActionResult CreateTodo(
           [FromBody] TodoDto todo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _todoListRepository.AddTodo(todo);

            //    //return CreatedAtRoute(
            //    //"GetTodo", new { id = ++maxTodoId });
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTodo(int id,
            [FromBody] TodoDto todo)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_todoListRepository.TodoExists(id))
            {
                _todoListRepository.UpdateTodo(id,todo);
                return NoContent();
            }
            else
            {
                return NotFound();
            }

            
        }

        [HttpPatch("{id}")]
        public IActionResult PartiallyUpdateTodo(int id,
            [FromBody] JsonPatchDocument<TodoDto> patchDoc)
        {
            var todoFromStore = _todoListRepository.GetTodo(id);
            if (todoFromStore == null)
            {
                return NotFound();
            }

            patchDoc.ApplyTo(todoFromStore, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!TryValidateModel(todoFromStore))
            {
                return BadRequest(ModelState);
            }

            return NoContent();
        }



    }
}
