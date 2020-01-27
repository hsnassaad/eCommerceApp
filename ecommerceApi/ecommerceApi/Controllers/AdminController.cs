using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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
    //[Authorize("RequireCustomerRole")]
    [AllowAnonymous]
    public class AdminController : ControllerBase
    {
        private IAdminRepository _adminService;

        public AdminController(IAdminRepository adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("dashboard/customers")]
        public IActionResult GetTopFiveFiveCustomer()
        {
            var users =  _adminService.GetTopFivePaidUsers();
            return Ok(users);
        }

        [HttpGet("dashboard/products")]
        public IActionResult GetTopFiveRequestedProducts()
        {
            var products = _adminService.GetTopFiveRequestedProducts();
            return Ok(products);
        }


    }
}