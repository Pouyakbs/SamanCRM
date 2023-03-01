using AutoMapper;
using SamanCRM.Shared.DomainModels.DTOs;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class ServicesProfile : Profile
    {
        public ServicesProfile()
        {
            CreateMap<Services, ServicesDTO>();
            CreateMap<ServicesDTO, Services>();
        }
    }
}
