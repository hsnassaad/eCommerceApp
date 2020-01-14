using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using ecommerceApi.Data;
using ecommerceApi.Dtos;
using ecommerceApi.Interfaces;
using ecommerceApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ecommerceApi.Controllers
{
    [Route("api/v1.0/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly IProductRepository _productService;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        public OrdersController(IProductRepository productService, UserManager<User> userManager, IMapper mapper)
        {
            _productService = productService;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var orders = await _productService.GetOrders(userId);
            return Ok(orders);
        }

        [HttpGet("{id}", Name ="GetOrder")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await _productService.GetOrder(id);

            if (order == null)
                return NotFound("Order is not found");

            return Ok(order);
        }

        [HttpPost("{userId}")]
        public async Task<IActionResult> CreateOrder(OrderForCreateDto orderForCreate, string userId)
        {
            if (userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
            {
                return Unauthorized("Unauthorized");
            }

            var user = await _userManager.FindByIdAsync(userId);
            float totalPrice = 0;

            var order = new Order
            {
                NumberOfItems = orderForCreate.OrderProducts.Count,
                UserId = user.Id
            };

            _productService.Add(order);
            await _productService.SaveAll();
                        
            for (int i = 0; i < orderForCreate.OrderProducts.Count; i++)
            {
                var orderProduct = new OrderProducts
                {
                    OrderId = order.OrderId,
                    ProductId = orderForCreate.OrderProducts[i].Product.ProductId,
                    Quantity = orderForCreate.OrderProducts[i].Quantity,
                };
                totalPrice += orderForCreate.OrderProducts[i].Product.UnitPrice * orderForCreate.OrderProducts[i].Quantity;
                _productService.Add(orderProduct);
            }
            
            order.TotalPrice = totalPrice;

            if (await _productService.SaveAll()) 
                return CreatedAtRoute("GetOrder", new { controller = "Orders" , id = order.OrderId }, order);

            return BadRequest($"Error while saving {order.OrderId}");
        }
    }
}