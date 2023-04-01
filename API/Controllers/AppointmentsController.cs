
namespace API.Controllers
{
    using API.DTOs;
    using API.Entities;
    using API.Interfaces;
    using AutoMapper;
    using Microsoft.AspNetCore.Mvc;

    // [Authorize]
    public class AppointmentsController : BaseApiController
    {
        private readonly ILogger<AppointmentsController> _logger;
        private readonly IUnitOfWork _unitOfWork;

        private readonly IMapper _mapper;

        public AppointmentsController(IUnitOfWork unitOfWork, IMapper mapper, 
            ILogger<AppointmentsController> logger)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointmentsForUser(int id)
        {
            var appointments = await _unitOfWork.AppointmentRepository.GetAppointmentsForUser(id);

            if (appointments == null) return NotFound();

            return Ok(appointments);        
        }

        [HttpGet("{pacientId}/{doctorId}", Name = "GetAppointment")]
        public async Task<ActionResult<Appointment>> GetAppointment(int pacientId, int doctorId)
        {
            var appointment = await _unitOfWork.AppointmentRepository.GetAppointmentByIdAsync(pacientId, doctorId);
            
            if (appointment == null) return NotFound();

            return Ok(appointment);
        }


        [HttpPost]
        public async Task<ActionResult<AppointmentDto>> AddAppointment(AppointmentDto appointment)
        {
            if (appointment == null) return NotFound("No appointment");

            var existingAppointment = _unitOfWork.AppointmentRepository.GetAppointmentCheck(appointment);

            if (!existingAppointment)
            {
                return BadRequest("The appointment time is not available. Please select another time.");
            }
      
            _unitOfWork.AppointmentRepository.AddAppointmentAsync(appointment);
            
            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetAppointment", new { pacientId = appointment.PacientId, doctorId = appointment.DoctorId }, appointment);
            }
            
            return BadRequest("Problem adding appointment");
        }

        [HttpDelete("delete/{pacientId}/{doctorId}")]
        public async Task<ActionResult> DeleteAppointment(int pacientId, int doctorId)
        {
            var currentAppointment = await _unitOfWork.AppointmentRepository.GetAppointmentByIdAsync(pacientId, doctorId);

            if (currentAppointment == null) return NotFound("No appointment to delete");

            _unitOfWork.AppointmentRepository.DeleteAppointment(currentAppointment);

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Problem deleting appointment");
        }

    }
}