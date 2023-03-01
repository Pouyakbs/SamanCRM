using AutoMapper;
using SamanCRM.Shared.DomainModels.DTOs;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class ProgramPartProfile : Profile
    {
        public ProgramPartProfile()
        {
            CreateMap<ProgramPart, ProgramPartDTO>();
            CreateMap<ProgramPartDTO, ProgramPart>();
        }
    }

}
