using AutoMapper;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class ConfirmationProfile : Profile
    {
        public ConfirmationProfile()
        {
            CreateMap<Confirmation, ConfirmationDTO>();
            CreateMap<ConfirmationDTO, Confirmation>();
        }
    }
}
