using SamanCRM.Core.Contracts.Repository.Common;
using SamanCRM.Core.Domain.Entities;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Repository
{
    public interface IPreInvoiceRepository : IGenericRepository<PreInvoice>
    {
        List<PreInvoice> GetPreInvoiceByID(int id);
    }
}
