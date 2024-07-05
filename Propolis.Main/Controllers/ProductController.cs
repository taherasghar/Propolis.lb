using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Propolis.DataAccess.Data;
using Propolis.DataAccess.Repository.IRepository;
using Propolis.Models;
using Propolis.Models.DTO;

namespace Propolis.lb.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepo;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProductController(IProductRepository productRepo, IWebHostEnvironment webHostEnvironment)
        {
            _productRepo = productRepo;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet("get-all-products")]
        public async Task<ActionResult> GetAll()
        {

            var products = await _productRepo.GetAllAsync();
            if (products.Count == 0)
            {
                return NotFound("No available products atm!");
            }
            return Ok(products);
        }

        [HttpGet("get-by-id/{id}")]
        public async Task<ActionResult> GetById(Guid id)
        {

            Product? product = await _productRepo.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound("Not Found");
            }
            return Ok(product);
        }

        [HttpPost("create-new-product")]
        public async Task<ActionResult<Product>> Create([FromForm] ProductDTO productDTO)
        {

            // Check if the image file is provided
            if (productDTO.Image == null || productDTO.Image.Length == 0)
            {
                return BadRequest("Image file is required.");
            }



            // Save the product to the repository
            Product? createdProduct = await _productRepo.CreateAsync(productDTO);
            if (createdProduct == null)
            {
                return Ok("Duplicated Name");
            }

            return CreatedAtAction(nameof(GetById), new { id = createdProduct.Id }, createdProduct);
        }

        [HttpPut("update-product/{id}")]
        public async Task<IActionResult> Update(Guid id, [FromForm] UpdateProductDTO updateProductDTO)
        {


            var updatedProduct = await _productRepo.UpdateAsync(id, updateProductDTO);
            if (updatedProduct == null)
            {
                return NotFound("Product either not found or duplicated name conflict");
            }

            return Ok(updatedProduct);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteById(Guid id)
        {
            Product? toBeDeleted = await _productRepo.DeleteAsync(id);
            if (toBeDeleted == null)
            {
                return NotFound("product was not found");
            }
            return Ok("Successfully deleted the following product\n" + toBeDeleted.Name);
        }


    }
}