﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Dtos
{
    public class ProductForCreationDto
    {
        public ProductForCreationDto()
        {
            CreatedDate = DateTime.Now;
            UpdatedDate = DateTime.Now;
        }
        [Required]
        public string Title { get; set; }
        [Required]
        public float UnitPrice { get; set; }
        public int Quantity { get; set; } = 1;
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
