using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface ICompetitorFacade
    {
        CompetitorDTO GetById(int id);
        IEnumerable<CompetitorDTO> GetAll();
        int Add(CompetitorDTO entity);
        void Remove(CompetitorDTO entity);
        void Update(CompetitorDTO entity);
    }
}
