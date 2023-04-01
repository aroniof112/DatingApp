

namespace API.Interfaces
{
    using API.DTOs;
    using API.Entities;
    public interface IAppointmentRepository
    {
        void AddAppointmentAsync(AppointmentDto appointment);
        void UpdateAppointmentAsync(AppointmentDto appointment);
        Task<IEnumerable<Appointment>> GetAppointmentsForUser(int currentUserId);
        Task<Appointment> GetAppointmentByIdAsync(int pacientId, int doctorId);
        bool GetAppointmentCheck(AppointmentDto appointment);
        void DeleteAppointment(Appointment appointment);

    }
}