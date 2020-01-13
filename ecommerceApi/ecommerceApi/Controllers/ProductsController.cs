using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ecommerceApi.Dtos;
using ecommerceApi.Interfaces;
using ecommerceApi.Models;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _productService.GetProducts();
            return Ok(products);
        }

        [HttpGet("{productId}", Name = "GetProduct")]
        [Authorize]
        public async Task<IActionResult> GetProduct(int productId)
        {
            var product = await _productService.GetProduct(productId);

            if (product == null) return NotFound($"Product with productId: {productId} is not found");

            return Ok(product);
        }

        [HttpPost]
        [Authorize("RequireAdminRole")]
        public async Task<IActionResult> CreateProduct(ProductForCreationDto productForCreationDto)
        {
            var product = _mapper.Map<Product>(productForCreationDto);

            if (_productService.ProductExist(productForCreationDto.Title))
                return Conflict("Product title already exist\nPlease change the title");

            _productService.Add(product);
            if (await _productService.SaveAll())
            {
                var productToReturn = _mapper.Map<ProductForDetailsDto>(product);
                return CreatedAtRoute("GetProduct", new { controller = "Products", productId = product.ProductId }, productToReturn);
            }
            return BadRequest($"Error while saving {productForCreationDto.Title}");
        }

        [HttpPut("{productId}")]
        [Authorize("RequireAdminRole")]
        public async Task<IActionResult> UpdateProduct(ProductForUpdateDto productForUpdate, int productId)
        {
            var product = await _productService.GetProduct(productId);

            if (product == null)
                return NotFound($"Product with productId: {productId} is not found");

            _mapper.Map(productForUpdate, product);

            if (await _productService.SaveAll()) return NoContent();

            return BadRequest($"Error while saving {product.Title}");
        }

        [HttpDelete("{productId}")]
        [Authorize("RequireAdminRole")]
        public async Task<IActionResult> DeleteProduct(int productId)
        {
            var product = await _productService.GetProduct(productId);

            if (product == null)
                return NotFound($"Product with productId: {productId} is not found");
            _productService.Remove(product);
            if (await _productService.SaveAll()) return NoContent();
            return BadRequest($"Error while deleting {product.Title}");
        }
    }
}