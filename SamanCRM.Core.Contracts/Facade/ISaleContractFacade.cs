using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface ISaleContractFacade
    {
        SaleContractDTO GetById(int id);
        IEnumerable<SaleContractDTO> GetAll();
        int Add(SaleContractDTO entity);
        void Remove(SaleContractDTO entity);
        void Update(SaleContractDTO entity);
    }
}
