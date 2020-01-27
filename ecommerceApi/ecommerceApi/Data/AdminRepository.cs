using ecommerceApi.Dtos;
using ecommerceApi.Interfaces;
using ecommerceApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Data
{
    public class AdminRepository : IAdminRepository
    {
        private DataContext _context;
        public AdminRepository(DataContext context)
        {
            _context = context;
        }

        public List<TopPaidUsersDto> GetTopFivePaidUsers()
        {
            var users = _context.TopPaidUsers
                .FromSqlRaw("SELECT Top(5) u.Email, SUM(o1.TotalPrice) as TotalPrice from dbo.Orders o1 INNER JOIN dbo.Orders o2 ON o1.UserId = o2.UserId AND o1.OrderId = o2.OrderId INNER JOIN dbo.AspNetUsers u ON o1.UserId = u.Id GROUP BY u.Email ORDER BY SUM(o1.TotalPrice) DESC")
                .ToList();

            return users;
                }

        public List<TopRequestedProductsDto> GetTopFiveRequestedProducts()
        {
            var products = _context.TopRequestedProducts
                .FromSqlRaw("SELECT Top(5) p.Title, SUM(op.Quantity) as TotalQuantity FROM Product p INNER JOIN OrderProducts op ON op.ProductId = p.ProductId GROUP BY p.Title ORDER BY SUM(op.Quantity) DESC")
                .ToList();
                
            return products;
        }
    }
}
