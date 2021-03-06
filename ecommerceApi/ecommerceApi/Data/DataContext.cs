﻿using ecommerceApi.Dtos;
using ecommerceApi.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<OrderProducts> OrderProducts { get; set; }
        public DbSet<TopPaidUsersDto> TopPaidUsers { get; set; }
        public DbSet<TopRequestedProductsDto> TopRequestedProducts { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<OrderProducts>()
                .HasKey(k => new { k.OrderId, k.ProductId });

            builder.Entity<OrderProducts>()
                .HasOne(op => op.Order)
                .WithMany(o => o.OrderProducts)
                .HasForeignKey(op => op.OrderId);

            builder.Entity<OrderProducts>()
             .HasOne(op => op.Product)
             .WithMany(o => o.OrderProducts)
             .HasForeignKey(op => op.ProductId);

            builder.Entity<TopPaidUsersDto>()
                .HasNoKey();
            
            builder.Entity<TopRequestedProductsDto>()
                .HasNoKey();
        }
    }
}
