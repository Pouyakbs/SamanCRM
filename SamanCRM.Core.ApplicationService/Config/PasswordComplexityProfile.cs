using AutoMapper;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class PasswordComplexityProfile : Profile
    {
        public PasswordComplexityProfile()
        {
            CreateMap<PasswordComplexity, PasswordComplexityDTO>();
            CreateMap<PasswordComplexityDTO, PasswordComplexity>();
        }
    }

}
