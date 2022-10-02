using CourseProjAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CouseProj2.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PersonController : ControllerBase
{
    private Indexes _indexes =
        JsonConvert.DeserializeObject<Indexes>(System.IO.File.ReadAllText(@"db/indexes.json"));

    private List<Person>? _persons =
        JsonConvert.DeserializeObject<List<Person>>(System.IO.File.ReadAllText(@"db/people.json"));

    // GET: api/Person
    [HttpGet]
    public IEnumerable<Person>? Get()
    {
        return _persons;
    }

    // GET: api/Person/5
    [HttpGet("{id}", Name = "Get")]
    public Person Get(int id)
    {
        return _persons.FirstOrDefault(p => p.PersonId == id);
    }

    // POST: api/Person
    [HttpPost]
    public void Post([FromBody] Person person)
    {
        person.PersonId = _indexes.Index;
        _indexes.Index++;
        updateIndexes(@"db/indexes.json");

        _persons.Add(person);
        updateDB(@"db/people.json");
    }

    // PUT: api/Person/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] Person person)
    {
        var p = _persons.FirstOrDefault(p => p.PersonId == id);
        p.Name = person.Name;
        p.PhoneNumber = person.PhoneNumber;
        p.Email = person.Email;

        p.Birthday = person.Birthday;

        p.Friends = person.Friends;
        p.Kinship = person.Kinship;
        p.WorkingPlace = person.WorkingPlace;
        p.EditionTime = DateTime.Now;

        _persons.Remove(_persons.FirstOrDefault(p => p.PersonId == id));
        _persons.Insert(_persons.Count-1, p);

        updateDB(@"db/people.json");
    }

    // DELETE: api/Person/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        _persons.Remove(_persons.FirstOrDefault(p => p.PersonId == id));
        updateDB(@"db/people.json");
    }

    private void updateDB(string path)
    {
        System.IO.File.WriteAllText(path, JsonConvert.SerializeObject(_persons));
        _persons = JsonConvert.DeserializeObject<List<Person>>(System.IO.File.ReadAllText(path));
    }

    private void updateIndexes(string path)
    {
        System.IO.File.WriteAllText(path, JsonConvert.SerializeObject(_indexes));
    }
}