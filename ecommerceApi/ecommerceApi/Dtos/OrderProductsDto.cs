using ecommerceApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Dtos
{
    public class OrderProductsDto
    {
        public ProductForDetailsDto Product { get; set; }

        public int Quantity { get; set; }
    }
}
