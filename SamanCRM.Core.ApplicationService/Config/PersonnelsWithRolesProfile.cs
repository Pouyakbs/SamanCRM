using AutoMapper;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Core.Domain.Models;
using SamanCRM.Shared.DomainModels.DTOs;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class PersonnelsWithRolesProfile : Profile
    {
        public PersonnelsWithRolesProfile()
        {
            CreateMap<PersonnelWithRoles, PersonnelsWithRolesDTO>();
            CreateMap<PersonnelsWithRolesDTO, PersonnelWithRoles>();
        }
    }

}
