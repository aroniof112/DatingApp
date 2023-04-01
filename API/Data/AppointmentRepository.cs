
namespace API.Data
{
    using API.Entities;
    using Microsoft.EntityFrameworkCore;
    using API.Interfaces;
    using API.DTOs;
    using AutoMapper;

    public class AppointmentRepository : IAppointmentRepository
    {
        public readonly DataContext _context;
        private readonly IMapper _mapper;

        public AppointmentRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void AddAppointmentAsync(AppointmentDto appointment)
        {
            var result = _mapper.Map<Appointment>(appointment);

            _context.Appointments.Add(result);
        }

        public async Task<Appointment> GetAppointmentByIdAsync(int pacientId, int doctorId)
        {
            return await _context.Appointments
                .Where(a => a.PacientId == pacientId)
                .Where(a => a.DoctorId == doctorId)
                .SingleOrDefaultAsync();
        }

        public bool GetAppointmentCheck(AppointmentDto appointment)
        {
            return !_context.Appointments.Any(a => a.DoctorId == appointment.DoctorId
                                            && a.AppointmentTime == appointment.AppointmentTime);
        }

        public async Task<IEnumerable<Appointment>> GetAppointmentsForUser(int currentUserId)
        {
            return await _context.Appointments
                .Where(a => a.PacientId == currentUserId || a.DoctorId == currentUserId)
                .ToListAsync();
        }

        public void UpdateAppointmentAsync(AppointmentDto appointment)
        {
            _context.Entry(appointment).State = EntityState.Modified;

        }

        public void DeleteAppointment(Appointment appointment)
        {
            _context.Appointments.Remove(appointment);
        }

    }
}