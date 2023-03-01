using AutoMapper;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class ApplicationSettingsProfile : Profile
    {
        public ApplicationSettingsProfile()
        {
            CreateMap<ApplicationSettings, ApplicationSettingsDTO>();
            CreateMap<ApplicationSettingsDTO, ApplicationSettings>();
        }
    }
}
