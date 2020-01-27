using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Dtos
{
    public class TopPaidUsersDto
    {
        public string Email { get; set; }
        public double TotalPrice { get; set; }
    }
}
