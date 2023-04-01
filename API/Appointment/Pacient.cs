
namespace API.Entities
{
    public class Pacient : AppUser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Results { get; set; }
        public ICollection<Appointment> Appointments { get; set; }
    }
}