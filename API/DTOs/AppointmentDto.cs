using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AppointmentDto
    {
        public string PacientUsername { get; set; }
        public string DoctorUsername { get; set; }
        public DateTime AppointmentTime { get; set; }
        public string Location { get; set; }
        public string Specialization { get; set; }
        public int PacientId { get; set; }
        public int DoctorId { get; set; }
    }
}