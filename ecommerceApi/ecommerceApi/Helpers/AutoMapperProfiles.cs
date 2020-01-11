using AutoMapper;
using ecommerceApi.Dtos;
using ecommerceApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceApi.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<ProductForCreationDto, Product>();
            CreateMap<UserForRegistrationDto, User>();
            CreateMap<User, UserForListDto>();
            CreateMap<User, UserForDetailsDto>();
            CreateMap<UserFoUpdateDto, User>();
        }
    }
}
