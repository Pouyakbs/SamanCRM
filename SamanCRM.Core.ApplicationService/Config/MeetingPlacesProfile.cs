using AutoMapper;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class MeetingPlacesProfile : Profile
    {
        public MeetingPlacesProfile()
        {
            CreateMap<MeetingPlaces, MeetingPlacesDTO>();
            CreateMap<MeetingPlacesDTO, MeetingPlaces>();
        }
    }

}
