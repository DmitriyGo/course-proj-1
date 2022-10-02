using CourseProjAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CouseProj2.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EventsController : ControllerBase
{
    private List<ScheduleEvent>? _events =
        JsonConvert.DeserializeObject<List<ScheduleEvent>>(System.IO.File.ReadAllText(@"db/events.json"));

    // GET: api/Person
    [HttpGet]
    public IEnumerable<ScheduleEvent>? Get()
    {
        return _events;
    }
    
    // GET: api/Person/5
    [HttpGet("{id}", Name = "GetEvent")]
    public ScheduleEvent Get(string id)
    {
        return _events.FirstOrDefault(p => p.Start == id);
    }

    // POST: api/Person
    [HttpPost]
    public void Post([FromBody] ScheduleEvent @event)
    {
        _events.Add(@event);
        updateDB(@"db/events.json");
    }

    // // PUT: api/Person/5
    // [HttpPut("{id}")]
    // public void Put(int id, [FromBody] ScheduleEvent @event)
    // {
    //     var p = _events.FirstOrDefault(p => p.Start == id.);
    //     p.Name = person.Name;
    //     p.PhoneNumber = person.PhoneNumber;
    //     p.Email = person.Email;
    //
    //     p.Birthday = person.Birthday;
    //
    //     p.Friends = person.Friends;
    //     p.Kinship = person.Kinship;
    //
    //     _persons.Remove(_persons.FirstOrDefault(p => p.PersonId == id));
    //     _persons.Insert(_persons.Count-1, p);
    //
    //     updateDB(@"db/people.json");
    // }

    // DELETE: api/Person/5
    // [HttpDelete("{id}")]
    // public void Delete(int id)
    // {
    //     _events.Remove(_events.FirstOrDefault(p => p.Start == id));
    //     updateDB(@"db/people.json");
    // }

    private void updateDB(string path)
    {
        System.IO.File.WriteAllText(path, JsonConvert.SerializeObject(_events));
        _events = JsonConvert.DeserializeObject<List<ScheduleEvent>>(System.IO.File.ReadAllText(path));
    }

    // private void updateIndexes(string path)
    // {
    //     System.IO.File.WriteAllText(path, JsonConvert.SerializeObject(_indexes));
    // }
}