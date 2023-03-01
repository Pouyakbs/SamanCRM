using AutoMapper;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class ActivitiesProfile : Profile
    {
        public ActivitiesProfile()
        {
            CreateMap<Activities, ActivitiesDTO>();
            CreateMap<ActivitiesDTO, Activities>();
            CreateMap<ActivitiesDTO, ActivitiesDetail>();
            CreateMap<ActivitiesDetail, ActivitiesDTO>();
            CreateMap<Activities, ActivitiesDetail>();
            CreateMap<ActivitiesDetail, Activities>();
        }
    }
}
