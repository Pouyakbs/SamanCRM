using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IOpportunitiesFacade
    {
        OpportunitiesDTO GetById(int id);
        IEnumerable<OpportunitiesDTO> GetAll();
        int Add(OpportunitiesDTO entity);
        void Remove(OpportunitiesDTO entity);
        void Update(OpportunitiesDTO entity);
    }
}
