using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IAnalysisFacade
    {
        AnalysisDTO GetById(int id);
        IEnumerable<AnalysisDTO> GetAll();
        int Add(AnalysisDTO entity);
        void Remove(AnalysisDTO entity);
        void Update(AnalysisDTO entity);
    }
}
