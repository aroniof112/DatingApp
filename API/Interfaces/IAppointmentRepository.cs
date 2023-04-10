

namespace API.Interfaces
{
    using API.DTOs;
    using API.Entities;
    public interface IAppointmentRepository
    {
        void AddAppointmentAsync(AppointmentForAddingDto appointment);
        void UpdateAppointmentAsync(AppointmentDto appointment);
        Task<IEnumerable<AppointmentDto>> GetAppointmentsForUser(int currentUserId);
        Task<AppointmentDto> GetAppointmentByIdAsync(int pacientId, int doctorId);
        Task<AppointmentDto> GetAppointment(AppointmentDto appointment);
        bool GetAppointmentCheck(AppointmentForAddingDto appointment);
        void DeleteAppointment(AppointmentDto appointment);

    }
}