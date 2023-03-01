using AutoMapper;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class ComPublicProfile : Profile
    {
        public ComPublicProfile()
        {
            CreateMap<ComPublic, ComPublicDTO>();
            CreateMap<ComPublicDTO, ComPublic>();
        }
    }
}
