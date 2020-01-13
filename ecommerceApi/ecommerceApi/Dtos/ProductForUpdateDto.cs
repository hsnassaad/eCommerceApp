using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Dtos
{
    public class ProductForUpdateDto
    {
        public ProductForUpdateDto()
        {
            UpdatedDate = DateTime.Now;
        }
        public string Title { get; set; }
        public string Description { get; set; }
        public float UnitPrice { get; set; }
        public int Quantity { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
