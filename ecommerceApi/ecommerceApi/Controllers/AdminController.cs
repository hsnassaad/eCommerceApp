using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ecommerceApi.Hubs;
using ecommerceApi.Interfaces;
using ecommerceApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace ecommerceApi.Controllers
{
    [Route("api/v1.0/[controller]")]
    [ApiController]
    //[Authorize("RequireCustomerRole")]
    [AllowAnonymous]
    public class AdminController : ControllerBase
    {
        private IAdminRepository _adminService;
        private readonly IHubContext<ChartHub> _hub;

        public AdminController(IAdminRepository adminService, IHubContext<ChartHub> hub)
        {
            _adminService = adminService;
            _hub = hub;
        }

        [HttpGet("dashboard/customers")]
        public IActionResult GetTopFiveFiveCustomer()
        {
            var users = _adminService.GetTopFivePaidUsers();
            return Ok(users);
        }

        [HttpGet("dashboard/products")]
        public IActionResult GetTopFiveRequestedProducts()
        {
            var products = _adminService.GetTopFiveRequestedProducts();

            return Ok(products);
        }

        //[HttpGet]
        //public IActionResult UpdateDashboards()
        //{
        //    var users = _adminService.GetTopFivePaidUsers();
        //    var products = _adminService.GetTopFiveRequestedProducts();

        //    _hub.Clients.All.SendAsync("updateDashboard", new { usersData = users, productsData = products });
        //    return Ok("okk");
        //}

    }
}