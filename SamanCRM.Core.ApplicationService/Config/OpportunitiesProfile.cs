using AutoMapper;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class OpportunitiesProfile : Profile
    {
        public OpportunitiesProfile()
        {
            CreateMap<Opportunities, OpportunitiesDTO>();
            CreateMap<OpportunitiesDTO, Opportunities>();
        }
    }
}
