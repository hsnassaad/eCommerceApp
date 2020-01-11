using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using ecommerceApi.Dtos;
using ecommerceApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ecommerceApi.Controllers
{
    [Route("api/v1.0/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        public UsersController(UserManager<User> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize("RequireAdminRole")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();
           var userToReturn = _mapper.Map<List<UserForListDto>>(users);
            return Ok(userToReturn);
        }

        [HttpGet("{userId}", Name ="GetUser")]
        [Authorize("RequireAdminRole")]
        public async Task<IActionResult> GetUserByEmailOrId(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
              user = await _userManager.FindByEmailAsync(userId);

            if (user == null)
                return NotFound("User Not Found");

            var userForDetails = _mapper.Map<UserForDetailsDto>(user);

            return Ok(userForDetails);
        }

        [HttpPost]
        [Authorize("RequireAdminRole")]
        public async Task<IActionResult> CreateUser(UserForRegistrationDto userForRegistration, string roleName)
        {
            var userToCreate = _mapper.Map<User>(userForRegistration);

            var createUserResult = await _userManager.CreateAsync(userToCreate, userForRegistration.Password);

            if (createUserResult.Succeeded)
            {
                if (string.IsNullOrWhiteSpace(roleName))
                {
                    roleName = "Customer";
                }
                var addRoleToUserResult = await _userManager.AddToRoleAsync(userToCreate, roleName);
                if (addRoleToUserResult.Succeeded)
                {
                var userToReturn = _mapper.Map<UserForDetailsDto>(userToCreate);
                return CreatedAtRoute("GetUser", new {  id = userToCreate.Id }, userToReturn);
                }
                return BadRequest(addRoleToUserResult.Errors);
            }
            return BadRequest(createUserResult.Errors);
        }

        [HttpPut("{userId}")]
        [Authorize]
        public async Task<IActionResult> UpdateUser(UserFoUpdateDto userFoUpdate, string userId)
        {
            if (userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
            {
                return Unauthorized("Unauthorized");
            }

            var userFromRepo = await _userManager.FindByIdAsync(userId);

            var user = _mapper.Map(userFoUpdate, userFromRepo);
            
            user.Updated = DateTime.Now;

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
                return NoContent();

            throw new Exception($"Updating user {userId} failed on save");
        }

        [HttpDelete("{userId}")]
        [Authorize("RequireAdminRole")]
        public async Task<IActionResult> DeleteUser(string userId)
        {

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null) return NotFound("User Not Found");

            var logins = await _userManager.GetLoginsAsync(user);
            var rolesForUser = await _userManager.GetRolesAsync(user);

                IdentityResult result = IdentityResult.Success;
                foreach (var login in logins)
                {
                    result = await _userManager.RemoveLoginAsync(user, login.LoginProvider, login.ProviderKey);
                    if (result != IdentityResult.Success)
                        break;
                }
                if (result == IdentityResult.Success)
                {
                    foreach (var item in rolesForUser)
                    {
                        result = await _userManager.RemoveFromRoleAsync(user, item);
                        if (result != IdentityResult.Success)
                            break;
                    }
                }
                if (result == IdentityResult.Success)
                {
                    result = await _userManager.DeleteAsync(user);
                if (result == IdentityResult.Success)
                    return Ok();
                }
            return BadRequest("Failed to delete this user");
        }
    }
}