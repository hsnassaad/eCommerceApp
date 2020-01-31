using ecommerceApi.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Hubs
{
    public class ChartHub : Hub
    {
        private IAdminRepository _adminService;
        public ChartHub(IAdminRepository adminService)
        {
            _adminService = adminService;
        }
        public void UpdateDashboards()
        {
            var users = _adminService.GetTopFivePaidUsers();
            var products = _adminService.GetTopFiveRequestedProducts();

            Clients.All.SendAsync("updateDashboard", new { usersData = users, productsData = products });
        }
    }
}
