using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Propolis.Models.DTO
{
    public class UpdateCartQuantityDTO
    {
        public Guid CartItemId { get; set; }
        public int NewQuantity { get; set; }

    }
}