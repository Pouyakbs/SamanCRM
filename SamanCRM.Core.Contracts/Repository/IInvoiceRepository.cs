using SamanCRM.Core.Contracts.Repository.Common;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Core.Contracts.Repository
{
    public interface IInvoiceRepository : IGenericRepository<Invoice>
    {
        Invoice GetInvoiceByID(int id);
    }
}
