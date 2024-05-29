using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Propolis.Models.DTO
{
    public class SubmitedOrderDTO
    {
        public string CustomerName { get; set; }
        public string ContactNumber { get; set; }
        public string City { get; set; }
        public string DeliveryAddress { get; set; }
        public string OrderNotes { get; set; }
    }
}