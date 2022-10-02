using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CourseProjAPI.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CouseProj2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private Indexes? _todoIndexes =
            JsonConvert.DeserializeObject<Indexes>(System.IO.File.ReadAllText(@"db/todoIndexes.json"));
        
        private List<ToDo>? _todos =
             JsonConvert.DeserializeObject<List<ToDo>>(System.IO.File.ReadAllText(@"db/todos.json"));
        
        // GET: api/ToDo
        [HttpGet]
        public IEnumerable<ToDo>? Get()
        {
            return _todos;
        }

        // GET: api/ToDo/5
        [HttpGet("{id}", Name = "GetTodo")]
        public ToDo? Get(int id)
        {
            return _todos.FirstOrDefault(p => p.ToDoId == id);
        }

        // POST: api/ToDo
        [HttpPost]
        public void Post([FromBody] ToDo Todo)
        {
            Todo.ToDoId = _todoIndexes.Index;
            _todoIndexes.Index++;
            updateIndexes(@"db/todoIndexes.json");

            _todos.Add(Todo);
            updateDB(@"db/todos.json");
        }

        // DELETE: api/ToDo/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _todos.Remove(_todos.FirstOrDefault(p => p.ToDoId == id));
            updateDB(@"db/todos.json");
        }
        
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] ToDo todo)
        {
            var p = _todos.FirstOrDefault(p => p.ToDoId == id);
            p.Color = todo.Color;
            p.Status = todo.Status;
            p.Text = todo.Text;

            _todos.Remove(_todos.FirstOrDefault(p => p.ToDoId == id));
            if(_todos.Count > 0)
                _todos.Insert(_todos.Count-1, p);
            else
                _todos.Insert(0, p);

            updateDB(@"db/todos.json");
        }
        
        private void updateDB(string path)
        {
            System.IO.File.WriteAllText(path, JsonConvert.SerializeObject(_todos));
            _todos = JsonConvert.DeserializeObject<List<ToDo>>(System.IO.File.ReadAllText(path));
        }
        private void updateIndexes(string path)
        {
            System.IO.File.WriteAllText(path, JsonConvert.SerializeObject(_todoIndexes));
        }
        
    }
}
