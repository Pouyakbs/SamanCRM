using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IBranchFacade
    {
        BranchDTO GetById(int id);
        IEnumerable<BranchDTO> GetAll();
        int Add(BranchDTO entity);
        void Remove(BranchDTO entity);
        void Update(BranchDTO entity);
    }
}
