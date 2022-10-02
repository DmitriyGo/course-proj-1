using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace CourseProjAPI.Models;

public class ToDo
{
    [Key] 
    public int ToDoId { get; set; }
    [Required]
    public string Text { get; set; }
    [Required] 
    public bool Status { get; set; }
    [DefaultValue("#987987")]
    public string Color { get; set; }
}