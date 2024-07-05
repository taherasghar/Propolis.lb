using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Propolis.Models;
using Propolis.Models.DTO;

namespace Propolis.DataAccess.Repository.IRepository
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllAsync();
        Task<Product?> GetProductByIdAsync(Guid id);
        Task<Product?> CreateAsync(ProductDTO productDTO);
        Task<Product?> UpdateAsync(Guid id, UpdateProductDTO updateProductDTO);

        Task<Product?> DeleteAsync(Guid id);

    }
}