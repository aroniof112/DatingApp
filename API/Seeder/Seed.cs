
namespace API.Data
{
    using API.Entities;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using System.Text.Json;

    public static class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, 
            RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var pacientData = await System.IO.File.ReadAllTextAsync("Seeder/UserSeedData.json");
            var pacients = JsonSerializer.Deserialize<List<Pacient>>(pacientData); //aici in loc de appuser ii pacient si gata avem pacienti

            if (pacients == null) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Member"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "Moderator"}
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var pacient in pacients)
            {
                pacient.UserName = pacient.UserName.ToLower();
                foreach (var photo in pacient.Photos)
                {
                    photo.IsApproved = true;
                }
                await userManager.CreateAsync(pacient, "Parola1$");
                await userManager.AddToRoleAsync(pacient, "Member");
            }

            var admin = new AppUser
            {
                UserName = "admin",
                City = "",
                Country = "",
                Gender = "",
                Interests = "",
                LookingFor = "",
                Introduction = "",
                KnownAs = ""
            };

            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"});

            var doctor = new Doctor
            {
                UserName = "medic",
                Profession = "Doctor primar",
                Specialization = "Ginecolog",
                City = "Targu Mures",
                Country = "Romania",
                Gender = "Male",
                Interests = "",
                LookingFor = "",
                Introduction = "",
                KnownAs = ""
            };

            await userManager.CreateAsync(doctor, "Parola1$");
            await userManager.AddToRoleAsync(doctor, "Moderator");
        }
    }
}