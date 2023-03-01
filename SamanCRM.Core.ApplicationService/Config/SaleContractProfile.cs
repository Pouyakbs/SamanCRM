using AutoMapper;
using SamanCRM.Shared.DomainModels.DTOs;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class SaleContractProfile : Profile
    {
        public SaleContractProfile()
        {
            CreateMap<SaleContract, SaleContractDTO>();
            CreateMap<SaleContractDTO, SaleContract>();
        }
    }
}
