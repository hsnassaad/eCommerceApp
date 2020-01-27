using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Dtos
{
    public class TopRequestedProductsDto
    {
        public string Title { get; set; }
        public int TotalQuantity { get; set; }
    }
}
