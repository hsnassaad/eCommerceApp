using ecommerceApi.Dtos;
using ecommerceApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Interfaces
{
   public interface IAdminRepository
    {
        List<TopPaidUsersDto> GetTopFivePaidUsers();
        List<TopRequestedProductsDto> GetTopFiveRequestedProducts();
    }
}
