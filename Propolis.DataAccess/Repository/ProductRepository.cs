using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Propolis.DataAccess.Data;
using Propolis.DataAccess.Repository.IRepository;
using Propolis.Models;
using Propolis.Models.DTO;

namespace Propolis.DataAccess.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _db;
        public ProductRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public async Task<List<Product>> GetAllAsync()
        {

            var products = await _db.Products.ToListAsync();

            return products;
        }

        public async Task<Product?> GetProductByIdAsync(Guid id)
        {
            Product? product = await _db.Products.FindAsync(id);
            if (product == null)
            {
                return null;
            }
            return product;
        }

        public async Task<Product?> CreateAsync(ProductDTO productDTO)
        {
            Product? duplicated = await _db.Products.FirstOrDefaultAsync(p => p.Name == productDTO.Name);
            if (duplicated != null)
            {
                return null;
            }
            string imageFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Images");
            if (!Directory.Exists(imageFolderPath))
            {
                Directory.CreateDirectory(imageFolderPath);
            }

            string uniqueFileName = $"{Guid.NewGuid()}_{productDTO.Image.FileName}";
            string imagePath = Path.Combine(imageFolderPath, uniqueFileName);

            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                await productDTO.Image.CopyToAsync(stream);
            }

            string imageUrl = $"/Images/{uniqueFileName}";

            Product product = new Product
            {
                Id = Guid.NewGuid(),
                Name = productDTO.Name,
                Description = productDTO.Description,
                Price = productDTO.Price,
                ImageURL = imageUrl
            };
            await _db.Products.AddAsync(product);
            await _db.SaveChangesAsync();
            return product;
        }

        public async Task<Product?> UpdateAsync(Guid id, ProductDTO productDTO)
        {
            Product? product = await _db.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
            {
                return null;
            }

            Product? duplicateName = await _db.Products.FirstOrDefaultAsync(p => p.Name == productDTO.Name);
            if (duplicateName != null && duplicateName.Id != product.Id)
            {
                return null;
            }

            product.Name = productDTO.Name;
            product.Description = productDTO.Description;
            product.Price = productDTO.Price;

            // Handle image update
            if (productDTO.Image != null)
            {
                // Delete the old image file if it exists
                if (!string.IsNullOrEmpty(product.ImageURL))
                {
                    string oldImagePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", Path.GetFileName(product.ImageURL));
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }
                }

                // Save the new image file
                string imageFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Images");
                if (!Directory.Exists(imageFolderPath))
                {
                    Directory.CreateDirectory(imageFolderPath);
                }

                string uniqueFileName = $"{Guid.NewGuid()}_{productDTO.Image.FileName}";
                string newImagePath = Path.Combine(imageFolderPath, uniqueFileName);

                using (var stream = new FileStream(newImagePath, FileMode.Create))
                {
                    await productDTO.Image.CopyToAsync(stream);
                }

                product.ImageURL = $"/Images/{uniqueFileName}";
            }

            await _db.SaveChangesAsync();
            return product;
        }
        public async Task<Product?> DeleteAsync(Guid id)
        {
            var product = await _db.Products.FindAsync(id);
            if (product == null)
            {
                return null;
            }

            string imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", Path.GetFileName(product.ImageURL));

            if (File.Exists(imagePath))
            {
                File.Delete(imagePath);
            }
            _db.Remove(product);
            await _db.SaveChangesAsync();
            return product;
        }

    }
}