using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoList.API.Models
{
    public class TodoDto
    {
        public int Id { get; set; }

        public string Task { get; set; }

        public string Details { get; set; }

        public DateTime DueDate { get; set; }

        public string Repeate { get; set; }

        public bool IsCompleted { get; set; }

    }
}
