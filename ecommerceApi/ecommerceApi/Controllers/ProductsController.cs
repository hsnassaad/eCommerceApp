using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ecommerceApi.Dtos;
using ecommerceApi.Interfaces;
using ecommerceApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ecommerceApi.Controllers
{
    [Route("api/v1.0/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productService;
        private readonly IMapper _mapper;
        public ProductsController(IProductRepository productService, IMapper mapper)
        {
            _productService = productService;
            _mapper = mapper;
        }

        [HttpGet()]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _productService.GetProducts();

            return Ok(products);
        }

        [HttpGet("{productId}")]
        public async Task<IActionResult> GetProduct(int productId)
        {
            var product = await _productService.GetProduct(productId);

            if (product == null) return NotFound($"Product with productId: {productId} is not found");

            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(ProductForCreationDto productForCreationDto)
        {
            // Add policy to admin (+ check if user is logged in)

            //if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //{
            //   return Unauthorized("Unauthorized");
            //}
            var product = _mapper.Map<Product>(productForCreationDto);

            if (_productService.ProductExist(productForCreationDto.Title))
                return BadRequest("Product Title already exist\nPlease change the title");

            product.CreatedDate = DateTime.Now;
            product.UpdatedDate = DateTime.Now;

            _productService.Add(product);
           if(await _productService.SaveAll()) return Ok();

            return BadRequest($"Error while saving {productForCreationDto.Title}");

        }

        //[HttpPost("")]
    }
}