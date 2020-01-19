using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;
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

        [HttpGet("{userId}", Name = "GetUser")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserByEmailOrId(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                user = await _userManager.FindByEmailAsync(userId);

            if (user == null)
                return NotFound("User Not Found");

            var userForDetails = _mapper.Map<UserForDetailsDto>(user);
            var userRoles = await _userManager.GetRolesAsync(user);

            return Ok(new { user = userForDetails, roles = userRoles });
        }


        //[HttpPost]
        //[Authorize("RequireAdminRole")]
        //public async Task<IActionResult> CreateUser(UserForRegistrationDto userForRegistration)
        //{
        //    var userToCreate = _mapper.Map<User>(userForRegistration);

        //    var createUserResult = await _userManager.CreateAsync(userToCreate, userForRegistration.Password);

        //    if (createUserResult.Succeeded)
        //    {
        //        if (string.IsNullOrWhiteSpace(userForRegistration.RoleName))
        //        {
        //            userForRegistration.RoleName = "Customer";
        //        }
        //        var addRoleToUserResult = await _userManager.AddToRoleAsync(userToCreate, userForRegistration.RoleName);
        //        if (addRoleToUserResult.Succeeded)
        //        {
        //        var userToReturn = _mapper.Map<UserForDetailsDto>(userToCreate);
        //        return CreatedAtRoute("GetUser", new { controller = "Users", userId = userToCreate.Id }, userToReturn);
        //        }
        //        return BadRequest(addRoleToUserResult.Errors);
        //    }
        //    return BadRequest(createUserResult.Errors);
        //}

        [Authorize("RequireAdminRole")]
        [HttpPost("{userId}/role")]
        public async Task<IActionResult> AddOrDeleteUserRole(UpdateRoleDto updateRole, string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var userRoles = await _userManager.GetRolesAsync(user);

                if (userRoles.Contains(updateRole.RoleName))
                {
                if (updateRole.Delete)
                {
                 var removeRoleResult = await _userManager.RemoveFromRoleAsync(user, updateRole.RoleName);

                    if(removeRoleResult.Succeeded) return NoContent();
                }
                    return BadRequest($"user is already in {updateRole.RoleName} role");
                }

          var addedRoleResult = await _userManager.AddToRoleAsync(user, updateRole.RoleName);
            if(addedRoleResult.Succeeded)
                return NoContent();

            return BadRequest($"Faild to add {updateRole.RoleName} role to {user.Email}");
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