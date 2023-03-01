using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface ISupplierFacade
    {
        SupplierDTO GetById(int id);
        IEnumerable<SupplierDTO> GetAll();
        int Add(SupplierDTO entity);
        void Remove(SupplierDTO entity);
        void Update(SupplierDTO entity);
    }
}
