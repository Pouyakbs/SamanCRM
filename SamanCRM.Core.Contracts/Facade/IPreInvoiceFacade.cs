using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IPreInvoiceFacade
    {
        PreInvoiceDTO GetById(int id);
        IEnumerable<PreInvoiceDTO> GetAll();
        int Add(PreInvoiceDTO entity);
        void Remove(PreInvoiceDTO entity);
        void Update(PreInvoiceDTO entity);
    }
}
