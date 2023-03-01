using AutoMapper;
using SamanCRM.Shared.DomainModels.DTOs;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class ReportProfile : Profile
    {
        public ReportProfile()
        {
            CreateMap<Report, ReportDTO>();
            CreateMap<ReportDTO, Report>();
        }
    }
}
