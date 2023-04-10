
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

        public void AddAppointmentAsync(AppointmentForAddingDto appointment)
        {
            var result = _mapper.Map<Appointment>(appointment);

            _context.Appointments.Add(result);
        }

        public async Task<AppointmentDto> GetAppointment(AppointmentDto appointmentDto)
        {
            return await _context.Appointments
                .Where(a => a.PacientId == appointmentDto.PacientId)
                .Where(a => a.DoctorId == appointmentDto.DoctorId)
                .Select(a => new AppointmentDto
                {
                    PacientUsername = a.Pacient.UserName,
                    DoctorUsername = a.Doctor.UserName,
                    AppointmentTime  = a.AppointmentTime,
                    Location = a.Location,
                    Specialization = a.Specialization,
                    PacientId = a.PacientId,
                    DoctorId = a.DoctorId
                })
                .SingleOrDefaultAsync();
        }

        public async Task<AppointmentDto> GetAppointmentByIdAsync(int pacientId, int doctorId)
        {
            return await _context.Appointments
                .Where(a => a.PacientId == pacientId)
                .Where(a => a.DoctorId == doctorId)
                .Select(a => new AppointmentDto
                {
                    PacientUsername = a.Pacient.UserName,
                    DoctorUsername = a.Doctor.UserName,
                    AppointmentTime  = a.AppointmentTime,
                    Location = a.Location,
                    Specialization = a.Specialization,
                    PacientId = a.PacientId,
                    DoctorId = a.DoctorId
                })
                .SingleOrDefaultAsync();
        }

        public bool GetAppointmentCheck(AppointmentForAddingDto appointment)
        {
            return !_context.Appointments.Any(a => a.DoctorId == appointment.DoctorId
                                            && a.AppointmentTime == appointment.AppointmentTime);
        }

        public async Task<IEnumerable<AppointmentDto>> GetAppointmentsForUser(int currentUserId)
        {
            return await _context.Appointments
                .Where(a => a.PacientId == currentUserId || a.DoctorId == currentUserId)
                .Select(a => new AppointmentDto 
                {
                    PacientUsername = a.Pacient.UserName,
                    DoctorUsername = a.Doctor.UserName,
                    AppointmentTime  = a.AppointmentTime,
                    Location = a.Location,
                    Specialization = a.Specialization,
                    PacientId = a.PacientId,
                    DoctorId = a.DoctorId
                })
                .ToListAsync();
        }

        public void UpdateAppointmentAsync(AppointmentDto appointmentDto)
        {
            var existingAppointment = _mapper.Map<Appointment>(appointmentDto);

            _context.Entry(existingAppointment).State = EntityState.Modified;
        }

        public void DeleteAppointment(AppointmentDto appointmentDto)
        {
            var deleteDto = _mapper.Map<Appointment>(appointmentDto);

            _context.Appointments.Remove(deleteDto);
        }
    }
}