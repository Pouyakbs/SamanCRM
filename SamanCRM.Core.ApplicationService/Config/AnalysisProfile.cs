using AutoMapper;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class AnalysisProfile : Profile
    {
        public AnalysisProfile()
        {
            CreateMap<Analysis, AnalysisDTO>();
            CreateMap<AnalysisDTO, Analysis>();
        }
    }
}
