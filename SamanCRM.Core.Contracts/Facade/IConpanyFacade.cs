using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface ICompanyFacade
    {
        CompanyDTO GetById(int id);
        IEnumerable<CompanyDTO> GetAll();
        int Add(CompanyDTO entity);
        void Remove(CompanyDTO entity);
        void Update(CompanyDTO entity);
    }
}
