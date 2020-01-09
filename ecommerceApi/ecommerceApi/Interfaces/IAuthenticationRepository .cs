using ecommerceApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Interfaces
{
    public interface IAuthenticationRepository
    {
        Task<User> Login(string email, string password);
        Task<User> Register(User user, string password);
        Task<bool> UserExist(string id);
    }
}
