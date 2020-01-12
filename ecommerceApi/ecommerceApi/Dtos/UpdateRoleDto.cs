using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Dtos
{
    public class UpdateRoleDto
    {
        [Required]
        public string RoleName { get; set; }
        [Required]
        public bool Delete { get; set; }
    }
}
