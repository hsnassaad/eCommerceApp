using ecommerceApi.Interfaces;
using ecommerceApi.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Data
{
    public class AuthenticationRepository : IAuthenticationRepository
    {
        private readonly UserManager<User> _userManager;
        public AuthenticationRepository(UserManager<User> userManager)
        {
            _userManager = userManager;
        }
        public async Task<User> Login(string email, string password)
        {
            return await _userManager.FindByEmailAsync(email) ?? null;
        }

        public async Task<User> Register(User user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);
            if (result.Succeeded)
            {
                return user;
            }
            return null;
        }

        public async Task<bool> UserExist(string id)
        {
            return await _userManager.FindByIdAsync(id) == null ? false : true;
        }
    }
}
