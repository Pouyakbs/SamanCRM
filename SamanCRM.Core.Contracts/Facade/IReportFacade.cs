using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IReportFacade
    {
        ReportDTO GetById(int id);
        IEnumerable<ReportDTO> GetAll();
        int Add(ReportDTO entity);
        void Remove(ReportDTO entity);
        void Update(ReportDTO entity);
    }
}
