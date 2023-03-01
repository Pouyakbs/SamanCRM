using AutoMapper;
using SamanCRM.Shared.DomainModels.DTOs;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class TargetProfile : Profile
    {
        public TargetProfile()
        {
            CreateMap<Target, TargetDTO>();
            CreateMap<TargetDTO, Target>();
        }
    }
}
