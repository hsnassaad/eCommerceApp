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
        void Remove<T>(T entity) where T : class;
        Task<ICollection<Product>> GetProducts();
        Task<Product> GetProduct(int id);
        Task<ICollection<Order>> GetOrders();
        Task<Order> GetOrder(int id);
        bool ProductExist(string title);
        Task<bool> SaveAll();
    }
}
