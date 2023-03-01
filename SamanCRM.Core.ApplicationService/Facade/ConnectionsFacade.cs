using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class ConnectionsFacade : IConnectionsFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public ConnectionsFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(ConnectionsDTO entity)
        {
            Connections connectionsDTO = mapper.Map<ConnectionsDTO, Connections>(entity);
            unitofWork.Connections.Add(connectionsDTO);
            unitofWork.Save();
            return connectionsDTO.ConnectionsID;
        }

        public IEnumerable<ConnectionsDTO> GetAll()
        {
            IEnumerable<Connections> connections = unitofWork.Connections.GetAll();
            IEnumerable<ConnectionsDTO> connectionsDTO = mapper.Map<IEnumerable<Connections>, IEnumerable<ConnectionsDTO>>(connections);
            return connectionsDTO;
        }

        public ConnectionsDTO GetById(int id)
        {
            Connections connections = unitofWork.Connections.GetById(id);
            ConnectionsDTO connectionsDTO = mapper.Map<Connections, ConnectionsDTO>(connections);
            return connectionsDTO;
        }

        public void Remove(ConnectionsDTO entity)
        {
            Connections connectionsDTO = mapper.Map<ConnectionsDTO, Connections>(entity);
            unitofWork.Connections.Remove(connectionsDTO);
            unitofWork.Save();
        }

        public void Update(ConnectionsDTO entity)
        {
            Connections connectionsDTO = mapper.Map<ConnectionsDTO, Connections>(entity);
            ConnectionsDTO connections = GetById(connectionsDTO.ConnectionsID);
            connectionsDTO.CreatedDate = connections.CreatedDate;
            unitofWork.Connections.Update(connectionsDTO);
            unitofWork.Save();
        }
    }
}
