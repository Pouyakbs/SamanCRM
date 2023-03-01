using AutoMapper;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class CompetitorProfile : Profile
    {
        public CompetitorProfile()
        {
            CreateMap<Competitor, CompetitorDTO>();
            CreateMap<CompetitorDTO, Competitor>();
        }
    }
}
