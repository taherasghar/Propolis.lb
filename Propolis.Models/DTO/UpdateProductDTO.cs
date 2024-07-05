using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Propolis.Models.DTO
{
    public class UpdateProductDTO
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        [Range(1, 200)]
        public double Price { get; set; }

        public IFormFile? Image { get; set; } = null;
    }
}