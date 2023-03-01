using AutoMapper;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class CluesProfile : Profile
    {
        public CluesProfile()
        {
            CreateMap<Clues, CluesDTO>();
            CreateMap<CluesDTO, Clues>();
        }
    }
}
