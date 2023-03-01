using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IServicesFacade
    {
        ServicesDTO GetById(int id);
        IEnumerable<ServicesDTO> GetAll();
        int Add(ServicesDTO entity);
        void Remove(ServicesDTO entity);
        void Update(ServicesDTO entity);
    }
}
