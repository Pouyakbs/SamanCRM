using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface ICluesFacade
    {
        CluesDTO GetById(int id);
        IEnumerable<CluesDTO> GetAll();
        int Add(CluesDTO entity);
        void Remove(CluesDTO entity);
        void Update(CluesDTO entity);
    }
}
