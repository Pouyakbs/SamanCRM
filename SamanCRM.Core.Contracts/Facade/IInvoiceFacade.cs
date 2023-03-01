using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IInvoiceFacade
    {
        InvoiceDTO GetById(int id);
        IEnumerable<InvoiceDTO> GetAll();
        int Add(InvoiceDTO entity);
        void Remove(InvoiceDTO entity);
        void Update(InvoiceDTO entity);
    }

}
