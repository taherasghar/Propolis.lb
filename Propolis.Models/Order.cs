using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Propolis.Models
{
    public class Order
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid UserId { get; set; }
        [Required]
        public string CustomerName { get; set; }
        [Required]
        [MaxLength(8, ErrorMessage = "Maximum lebanese phone number is 8 digits")]
        public string ContactNumber { get; set; }
        public string City { get; set; }
        public string DeliveryAddress { get; set; }
        public string OrderNotes { get; set; }

        [Required]
        public DateTime OrderDate { get; set; }

        [Required]
        public double TotalAmount { get; set; }

        public virtual ICollection<OrderItem> OrderItems { get; set; }

        public Order()
        {
            OrderItems = new HashSet<OrderItem>();
        }
    }
}