using AutoMapper;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class ConnectionsProfile : Profile
    {
        public ConnectionsProfile()
        {
            CreateMap<Connections, ConnectionsDTO>();
            CreateMap<ConnectionsDTO, Connections>();
        }
    }
}
