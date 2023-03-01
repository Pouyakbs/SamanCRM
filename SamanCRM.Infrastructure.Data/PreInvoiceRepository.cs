using Microsoft.EntityFrameworkCore;
using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;
using System.Collections.Generic;
using System.Linq;

namespace SamanCRM.Infrastructure.Data
{
    public class PreInvoiceRepository : GenericRepository<PreInvoice>, IPreInvoiceRepository
    {
        private readonly DemoContext context;

        public PreInvoiceRepository(DemoContext Context) : base(Context)
        {
            context = Context;
        }
        public List<PreInvoice> GetPreInvoiceByID(int id)
        {
            var result = context.PreInvoices.Where(a => a.PreInvoiceID == id).Include(a => a.PreInvoiceProducts).ToList();
            return result;
        }
    }
}
