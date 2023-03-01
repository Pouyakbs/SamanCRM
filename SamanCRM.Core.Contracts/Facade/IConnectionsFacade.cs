using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IConnectionsFacade
    {
        ConnectionsDTO GetById(int id);
        IEnumerable<ConnectionsDTO> GetAll();
        int Add(ConnectionsDTO entity);
        void Remove(ConnectionsDTO entity);
        void Update(ConnectionsDTO entity);
    }
}
