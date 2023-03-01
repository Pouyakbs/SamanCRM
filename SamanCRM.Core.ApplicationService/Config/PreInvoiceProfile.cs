using AutoMapper;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class PreInvoiceProfile : Profile
    {
        public PreInvoiceProfile()
        {
            CreateMap<PreInvoice, PreInvoiceDTO>();
            CreateMap<PreInvoiceDTO, PreInvoice>();
        }
    }
}
