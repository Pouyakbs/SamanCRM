using AutoMapper;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class PersonsProfile : Profile
    {
        public PersonsProfile()
        {
            CreateMap<Persons, PersonsDTO>();
            CreateMap<PersonsDTO, Persons>();
        }
    }
}
