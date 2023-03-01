using SamanCRM.Core.Contracts.Repository.Common;
using SamanCRM.Core.Domain.Entities;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Repository
{
    public interface ISupplierRepository : IGenericRepository<Supplier>
    {
        Supplier GetSupplierByID(int id);
    }
}
