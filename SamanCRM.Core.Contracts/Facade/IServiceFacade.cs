using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IServiceFacade
    {
        ServiceDTO GetById(int id);
        IEnumerable<ServiceDTO> GetAll();
        int Add(ServiceDTO entity);
        void Remove(ServiceDTO entity);
        void Update(ServiceDTO entity);
    }
}
