using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Propolis.Models.DTO
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "Missing Credentials!")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Missing Credentials!")]
        public string Password { get; set; }
    }
}