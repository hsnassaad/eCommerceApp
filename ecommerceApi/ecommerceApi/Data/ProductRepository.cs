using ecommerceApi.Interfaces;
using ecommerceApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;
        public ProductRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Remove<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Product> GetProduct(int id)
        {
            var product = await _context.Product.FirstOrDefaultAsync(p => p.ProductId == id);
            if (product != null) return product;

            return null;
        }

        public async Task<ICollection<Product>> GetProducts()
        {
            return await _context.Product.ToListAsync();
        }

        public async Task<ICollection<Order>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        public async Task<Order> GetOrder(int id)
        {
            var order = await _context.Orders
                .Include(p => p.OrderProducts)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(o => o.OrderId == id);
                
            //var orderProducts = order.OrderProducts.Select(p => p.Product);
            return order ?? null;
        }

        public bool ProductExist(string title)
        {
            if (_context.Product.Any(p => p.Title == title)) 
                return true;
            return false;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
