using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Propolis.DataAccess.Data;
using Propolis.Models;
public class UserDto
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    // Other properties without Password
}
namespace Propolis.Main.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public UserController(ApplicationDbContext db)
        {
            _db = db;

        }

        [HttpGet("get-all-users")]
        public async Task<ActionResult<List<User>>> GetAllOrders()
        {
            var users = await _db.Users
                   .Select(user => new UserDto
                   {
                       Id = Guid.Parse(user.Id),
                       FirstName = user.FirstName,
                       LastName = user.LastName,
                       Username = user.UserName,
                       Email = user.Email,
                   })
                   .ToListAsync(); return Ok(users);
        }
    }
}