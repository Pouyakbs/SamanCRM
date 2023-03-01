using AutoMapper;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class ArchiveProfile : Profile
    {
        public ArchiveProfile()
        {
            CreateMap<Archive, ArchiveDTO>();
            CreateMap<ArchiveDTO, Archive>();
        }
    }
}
