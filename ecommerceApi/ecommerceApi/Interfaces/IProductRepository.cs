using ecommerceApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Interfaces
{
    public interface IProductRepository
    {

        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<ICollection<Product>> GetProducts();
        Task<Product> GetProduct(int id);

        bool ProductExist(string title);
        Task<bool> SaveAll();
    }
}
