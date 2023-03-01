using AutoMapper;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class PaymentProfile : Profile
    {
        public PaymentProfile()
        {
            CreateMap<Payment, PaymentDTO>();
            CreateMap<PaymentDTO, Payment>();
        }
    }
}
