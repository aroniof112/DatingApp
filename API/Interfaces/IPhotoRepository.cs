
namespace API.Interfaces
{
    using API.DTOs;
    using API.Entities; 
    public interface IPhotoRepository
    {
        Task<List<PhotoForApprovalDto>> GetUnapprovedPhotosAsync();
        Task<Photo> GetPhotoByIdAsync(int id);
        void DeletePhoto(Photo photo);
    }
}