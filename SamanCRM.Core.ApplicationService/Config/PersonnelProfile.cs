using AutoMapper;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class PersonnelProfile : Profile
    {
        public PersonnelProfile()
        {
            CreateMap<Personnel, PersonnelDTO>();
            CreateMap<PersonnelDTO, Personnel>();
        }
    }
}
