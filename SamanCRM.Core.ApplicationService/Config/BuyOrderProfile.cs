using AutoMapper;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class BuyOrderProfile : Profile
    {
        public BuyOrderProfile()
        {
            CreateMap<BuyOrder, BuyOrderDTO>();
            CreateMap<BuyOrderDTO, BuyOrder>();
        }
    }
}
