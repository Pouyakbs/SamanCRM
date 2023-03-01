using AutoMapper;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class ComPublicTitlesProfile : Profile
    {
        public ComPublicTitlesProfile()
        {
            CreateMap<ComPublicTitles, ComPublicTitlesDTO>();
            CreateMap<ComPublicTitlesDTO, ComPublicTitles>();
        }
    }
}
