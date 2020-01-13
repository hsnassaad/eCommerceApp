using ecommerceApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Dtos
{
    public class OrderForCreateDto
    {
        public List<OrderProductsDto> OrderProducts { get; set; }
    }
}
