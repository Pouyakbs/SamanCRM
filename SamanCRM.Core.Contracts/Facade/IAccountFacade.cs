using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IAccountFacade
    {
        AccountDTO GetById(int id);
        IEnumerable<AccountDTO> GetAll();
        int Add(AccountDTO entity);
        void Remove(AccountDTO entity);
        void Update(AccountDTO entity);
    }
}
