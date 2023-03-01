using Microsoft.EntityFrameworkCore;
using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;
using System.Linq;

namespace SamanCRM.Infrastructure.Data
{
    public class InvoiceRepository : GenericRepository<Invoice>, IInvoiceRepository
    {
        private readonly DemoContext context;

        public InvoiceRepository(DemoContext Context) : base(Context)
        {
            context = Context;
        }
        public Invoice GetInvoiceByID(int id)
        {
            var result = context.Invoice.Where(a => a.InvoiceID == id).Include(a => a.InvoiceProducts).FirstOrDefault();
            return result;
        }
    }
}
