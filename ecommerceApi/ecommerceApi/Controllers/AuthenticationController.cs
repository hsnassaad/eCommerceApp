using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ecommerceApi.Dtos;
using ecommerceApi.Interfaces;
using ecommerceApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace ecommerceApi.Controllers
{
    [Route("api/v1.0/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthenticationController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        public AuthenticationController(IConfiguration config, IMapper mapper,
                                        UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _config = config;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var user = await _userManager.FindByEmailAsync(userForLoginDto.Email);

            if (user != null)
            {

                var result = await _signInManager.CheckPasswordSignInAsync(user, userForLoginDto.Password, false);


                if (result.Succeeded)
                {
                    var userToReturn = _mapper.Map<UserForDetailsDto>(user);

                    return Ok(new
                    {
                        token = await GenerateJwtToken(user),
                        user = userToReturn
                    });
                }
            }

            return Unauthorized("Invalid email or password");
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegistrationDto userForRegistrationDto)
        {
            var userToCreate = _mapper.Map<User>(userForRegistrationDto);

            if (await _userManager.FindByEmailAsync(userForRegistrationDto.Email) != null) 
                return Conflict("Email aleardy exist");

            var createUserResult = await _userManager.CreateAsync(userToCreate, userForRegistrationDto.Password);

            if (createUserResult.Succeeded)
            {
                if (string.IsNullOrWhiteSpace(userForRegistrationDto.RoleName))
                   {
                    userForRegistrationDto.RoleName = "Customer";
                    }
                    var addRoleToUserResult = await _userManager.AddToRoleAsync(userToCreate, userForRegistrationDto.RoleName);

                if (addRoleToUserResult.Succeeded)
                {
                    var userToReturn = _mapper.Map<UserForDetailsDto>(userToCreate);
                    return CreatedAtRoute("GetUser", new { controller = "Users" , userId = userToCreate.Id }, userToReturn);
                }

                return BadRequest(addRoleToUserResult.Errors);
            }
            return BadRequest(createUserResult.Errors);
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email)
            };


            var roles = await _userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);


            var tokenDesciptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(5),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDesciptor);

            return tokenHandler.WriteToken(token);
        }

    }
}