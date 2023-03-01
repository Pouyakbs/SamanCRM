using Microsoft.EntityFrameworkCore;
using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;
using System.Collections.Generic;
using System.Linq;

namespace SamanCRM.Infrastructure.Data
{
    public class ProductsRepository : GenericRepository<Products>, IProductsRepository
    {

        public ProductsRepository(DemoContext Context) : base(Context)
        {
        }
    }
}
