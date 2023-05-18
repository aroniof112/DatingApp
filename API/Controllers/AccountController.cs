
namespace API.Controllers
{
    using API.DTOs;
    using API.Entities;
    using API.Interfaces;
    using AutoMapper;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    
    public class AccountController : BaseApiController
    {
        private readonly ILogger<AccountController> _logger;
        private readonly ITokenService _tokenService;
        public readonly IMapper _mapper;
        public readonly UserManager<AppUser> _userManager;
        public readonly SignInManager<AppUser> _signInManager;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService,
         IMapper mapper, ILogger<AccountController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _tokenService = tokenService;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<ActionResult<PacientDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

            var pacient = new Pacient
            {
                UserName = registerDto.Username.ToLower(),
                Gender = registerDto.Gender,
                City = registerDto.City,
                Country = registerDto.Country,
                KnownAs = registerDto.KnownAs,
                Interests = "",
                Introduction = "Introduction",
                LookingFor = registerDto.Gender
            };

            var result = await _userManager.CreateAsync(pacient, registerDto.Password);

            if(!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(pacient, "Member");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            //this is to set the currentId of the new user to a token (for appointments)
            var pacientDto = new PacientDto
            {
                Username = pacient.UserName,
                Token = await _tokenService.CreateToken(pacient),
                Gender = pacient.Gender
            };

            return pacientDto;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username");

            var result = await _signInManager
                .CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized();

             return new UserDto
            {
                Id = user.Id,
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                KnownAs = user.KnownAs,
                Gender = user.Gender,
                Discriminator = user.GetType().Name
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}