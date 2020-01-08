using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Dtos
{
    public class ProductForCreationDto
    {
        public string Title { get; set; }
        public float UnitPrice { get; set; }
        public int Quantity { get; set; }

    }
}
