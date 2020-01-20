using ecommerceApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Dtos
{
    public class OrderForDetailsDto
    {
        public int OrderId { get; set; }
        public int NumberOfItems { get; set; }
        public float TotalPrice { get; set; }
        public DateTime CreatedDate { get; set; }
        public ICollection<OrderProductsDto> OrderProducts { get; set; }
    }
}
