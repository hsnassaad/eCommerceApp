﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Dtos
{
    public class UserForRegistrationDto
    {
        public UserForRegistrationDto()
        {
            Created = DateTime.Now;
            Updated = DateTime.Now;
        }
        [Required]
        public string FirstName { get; set; }
        
        [Required]
        public string LastName { get; set; }
        public string Gender { get; set; }

        [Required]
        public string Email { get; set; }

        public string Password { get; set; }
        public DateTime? Created { get; set; }

        public DateTime? Updated { get; set; }

    }
}
