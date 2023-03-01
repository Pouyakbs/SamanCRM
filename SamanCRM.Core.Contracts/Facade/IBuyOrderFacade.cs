using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IBuyOrderFacade
    {
        BuyOrderDTO GetById(int id);
        IEnumerable<BuyOrderDTO> GetAll();
        int Add(BuyOrderDTO entity);
        void Remove(BuyOrderDTO entity);
        void Update(BuyOrderDTO entity);
    }
}
