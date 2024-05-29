using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Propolis.Models.DTO
{
    public class ProductDTO
    {
        [Required]
        public string Name { get; set; } = null!;
        [Required]
        public string Description { get; set; } = null!;
        [Required]
        [Range(1, 200)]
        public double Price { get; set; }

        [Required]
        public required IFormFile Image { get; set; }
    }
}