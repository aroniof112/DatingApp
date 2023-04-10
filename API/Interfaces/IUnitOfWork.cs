
namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IMessageRepository MessageRepository { get; }
        IPhotoRepository PhotoRepository { get; }
        IAppointmentRepository AppointmentRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}