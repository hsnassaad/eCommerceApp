using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public int NumberOfItems { get; set; }
        public float TotalPrice { get; set; }
        public DateTime CreatedDate { get; set; }

        public ICollection<OrderProducts> OrderProducts { get; set; }
    }
}
