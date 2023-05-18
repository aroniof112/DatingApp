namespace API.Entities
{
    using API.Data;
    
    public class Appointment
    {
        public DateTime AppointmentTime { get; set; }
        public string Location { get; set; }
        public string Specialization { get; set; }

        //Foreign keys
        public int PacientId { get; set; }
        public  Pacient Pacient { get; set; }

        public int DoctorId { get; set; }
        public  Doctor Doctor { get; set; }
    }
}