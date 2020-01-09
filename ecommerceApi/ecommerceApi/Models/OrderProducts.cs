using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Models
{
    public class OrderProducts
    {
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int Quantity { get; set; }

        public User User { get; set; }
    }
}
