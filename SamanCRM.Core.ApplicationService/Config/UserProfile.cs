using AutoMapper;
using SamanCRM.Shared.DomainModels.DTOs;
using SamanCRM.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<ApplicationUser, UserDTO>();
            CreateMap<UserDTO, ApplicationUser>();
            CreateMap<Task<ApplicationUser>, Task<UserDTO>>();
            CreateMap<Task<UserDTO>, Task<ApplicationUser>>();
        }
    }
}
