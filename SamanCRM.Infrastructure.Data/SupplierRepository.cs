using Microsoft.EntityFrameworkCore;
using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;
using System.Collections.Generic;
using System.Linq;

namespace SamanCRM.Infrastructure.Data
{
    public class SupplierRepository : GenericRepository<Supplier>, ISupplierRepository
    {
        private readonly DemoContext context;

        public SupplierRepository(DemoContext Context) : base(Context)
        {
            context = Context;
        }
        public Supplier GetSupplierByID(int id)
        {
            var result = context.Suppliers.Where(a => a.SupplierID == id).Include(a => a.SupplierProducts).FirstOrDefault();
            return result;
        }
    }
}
