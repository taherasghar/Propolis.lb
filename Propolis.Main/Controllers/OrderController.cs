using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Propolis.DataAccess.Data;
using Propolis.DataAccess.Repository.IRepository;
using Propolis.Models;
using Propolis.Models.DTO;

namespace Propolis.Main.Controllers
{
    [ApiController]
    [Route("api/order")]
    public class OrderController : ControllerBase
    {
        private readonly IProductRepository _productRepo;
        private readonly ApplicationDbContext _db;
        public OrderController(ApplicationDbContext db, IProductRepository productRepo)
        {
            _db = db;
            _productRepo = productRepo;

        }

        [HttpPost("submit-order")]
        public async Task<ActionResult> SubmitOrder([FromBody] SubmitedOrderDTO orderDTO)
        {
            // Retrieve the JWT token from the Authorization header
            var authorizationHeader = Request.Headers["Authorization"].ToString();

            if (string.IsNullOrWhiteSpace(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
            {
                return BadRequest("User is Unauthorized");
            }

            var token = authorizationHeader.Substring("Bearer ".Length).Trim();

            // Decode the JWT token to get the user ID
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);
            var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "sub").Value;

            // Create a new Order object
            var order = new Order
            {
                Id = Guid.NewGuid(),
                UserId = Guid.Parse(userId),
                CustomerName = orderDTO.CustomerName,
                ContactNumber = orderDTO.ContactNumber,
                City = orderDTO.City,
                DeliveryAddress = orderDTO.DeliveryAddress,
                OrderNotes = orderDTO.OrderNotes,
                OrderDate = DateTime.UtcNow, // Set order date to current UTC time
                TotalAmount = 3 // deilvery amount is 3
            };

            var cartItems = await _db.Carts
                      .Where(c => c.UserId == order.UserId)
                      .ToListAsync();

            foreach (var cartItem in cartItems)
            {
                var product = await _productRepo.GetProductByIdAsync(cartItem.ProductId);
                if (product == null)
                {
                    return BadRequest($"Product with ID {cartItem.ProductId} not found");
                }

                var orderItem = new OrderItem
                {
                    ProductId = cartItem.ProductId,
                    Product = product,
                    Quantity = cartItem.Quantity,
                    UnitPrice = product.Price // Use the product's price as the unit price
                };

                order.OrderItems.Add(orderItem);
                order.TotalAmount += orderItem.UnitPrice * orderItem.Quantity; // Add unit price * quantity to total amount
            }

            // Add the Order to the database and save changes
            _db.Orders.Add(order);
            await _db.SaveChangesAsync();

            // Remove submitted items from the Cart
            _db.Carts.RemoveRange(cartItems);
            await _db.SaveChangesAsync();

            return Ok("Order submitted successfully");
        }


        [HttpGet("get-all-orders")]
        public async Task<ActionResult<List<Order>>> GetAllOrders()
        {
            var orders = await _db.Orders.Include(o => o.OrderItems).ThenInclude(p => p.Product)
                                        .OrderByDescending(o => o.OrderDate)
                                        .ToListAsync();
            return Ok(orders);
        }


        [HttpGet("get-orders-by-user-id")]
        public async Task<ActionResult<List<Order>>> GetOrdersByUserId()
        {
            // Retrieve the JWT token from the Authorization header
            var authorizationHeader = Request.Headers["Authorization"].ToString();

            if (string.IsNullOrWhiteSpace(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
            {
                return BadRequest("User is Unauthorized");
            }

            var token = authorizationHeader.Substring("Bearer ".Length).Trim();

            // Decode the JWT token to get the user ID
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);
            var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "sub").Value;
            var orders = await _db.Orders
                                        .Where(o => o.UserId == Guid.Parse(userId))
                                        .OrderByDescending(o => o.OrderDate)
                                        .ToListAsync();

            if (orders == null || orders.Count == 0)
            {
                return NotFound("No orders found for the user ID.");
            }

            return Ok(orders);
        }
    }
}