using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface ITargetFacade
    {
        TargetDTO GetById(int id);
        IEnumerable<TargetDTO> GetAll();
        int Add(TargetDTO entity);
        void Remove(TargetDTO entity);
        void Update(TargetDTO entity);
    }
}
