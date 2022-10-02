using System.ComponentModel.DataAnnotations;

namespace CourseProjAPI.Models;

public class Person
{
    [Key] 
    public int PersonId { get; set; }

    [MaxLength(30)] 
    public string Name { get; set; } = string.Empty;

    public DateTime Birthday { get; set; }
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public int[]? Friends { get; set; }
    public string? Kinship { get; set; } = "friend";
    public string? WorkingPlace { get; set; } = "not specified";
    public DateTime? EditionTime { get; set; } = DateTime.Now;
}