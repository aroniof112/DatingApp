
namespace API.Data
{
    using API.Entities;

    public class Doctor : AppUser
    {
        public int Id { get; set; }
        public string Profession { get; set; }
        public string Specialization { get; set; }
        public ICollection<Appointment> Appointments { get; set; }
    }
}