using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Azure.Messaging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Propolis.DataAccess.Data;
using Propolis.DataAccess.Repository.IRepository;
using Propolis.lb.Controllers;
using Propolis.Models;
using Propolis.Models.DTO;

namespace Propolis.Main.Controllers
{
    [ApiController]
    [Route("api/cart")]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IProductRepository _productRepo;

        public CartController(ApplicationDbContext context, IProductRepository productRepo)
        {
            _context = context;
            _productRepo = productRepo;
        }


        [HttpGet("get-all-cart-items")]
        public async Task<ActionResult<List<Cart>>> GetAllAsync()
        {

            var carts = await _context.Carts
                    .Include(c => c.Product)
                    .ToListAsync();

            return Ok(carts);
        }

        [Authorize]
        [HttpGet("get-cart-items-by-user-id")]
        public async Task<ActionResult<List<Cart>>> GetById()
        {

            var authorizationHeader = Request.Headers["Authorization"].ToString();

            if (string.IsNullOrWhiteSpace(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
            {
                return BadRequest("User is Unathorized");
            }

            var token = authorizationHeader.Substring("Bearer ".Length).Trim();

            // Decode the JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);
            Console.WriteLine("\n\n\n\n\nToken info is ", jwtToken);
            // Access claims from the token
            var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "sub").Value;

            var cartItems = await _context.Carts
                      .Where(c => c.UserId == Guid.Parse(userId)).Include(c => c.Product)
                      .ToListAsync();

            return cartItems;
        }

        [HttpPost("add-item-to-cart")]
        public async Task<ActionResult<Cart>> AddToCart(AddCartItemDTO cartItemDTO)
        {
            // Retrieve the JWT token from the Authorization header
            var authorizationHeader = Request.Headers["Authorization"].ToString();

            if (string.IsNullOrWhiteSpace(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
            {
                return BadRequest("User is Unathorized");
            }

            var token = authorizationHeader.Substring("Bearer ".Length).Trim();

            // Decode the JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);
            Console.WriteLine("\n\n\n\n\nToken info is ", jwtToken);
            // Access claims from the token
            var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "sub").Value;

            Product? product = await _productRepo.GetProductByIdAsync(cartItemDTO.ProductId);

            if (product == null)
            {
                return BadRequest("Product not found");
            }

            Cart? similarExistingCartItem = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == Guid.Parse(userId) && c.ProductId == cartItemDTO.ProductId);

            if (similarExistingCartItem != null)
            {
                _context.Carts.Remove(similarExistingCartItem);
                _context.SaveChanges();

            }

            Cart cartItem = new Cart
            {
                Id = Guid.NewGuid(),
                UserId = Guid.Parse(userId),
                ProductId = cartItemDTO.ProductId,
                Product = product,
                Quantity = cartItemDTO.Quantity
            };
            _context.Carts.Add(cartItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = cartItem.Id }, cartItem);
        }


        [HttpPut("update-cart-item-quantity")]
        public async Task<ActionResult<Cart>> UpdateCartItemQuantity([FromBody] UpdateCartQuantityDTO updateCartQuantityDTOcartQuantityDTO)
        {

            Console.WriteLine("\n\ncheck this data\n");
            Console.WriteLine(updateCartQuantityDTOcartQuantityDTO.CartItemId);
            Console.WriteLine(updateCartQuantityDTOcartQuantityDTO.NewQuantity);
            Cart? cartItem = await _context.Carts.FindAsync(updateCartQuantityDTOcartQuantityDTO.CartItemId);
            if (cartItem == null)
            {
                return NotFound("Item Does Not Exist");
            }

            cartItem.Quantity = updateCartQuantityDTOcartQuantityDTO.NewQuantity;
            await _context.SaveChangesAsync();
            var response = new { success = true, item = cartItem };

            return Ok(response);
        }


        [HttpDelete("remove-item-from-cart/{cartItemId}")]
        public async Task<ActionResult> RemoveFromCart(Guid cartItemId)
        {
            var cartItem = await _context.Carts.FindAsync(cartItemId);
            if (cartItem == null)
            {
                return NotFound("Item not found in the cart");
            }
            _context.Carts.Remove(cartItem);
            await _context.SaveChangesAsync();

            return Ok("Item removed from the cart");
        }


    }
}
