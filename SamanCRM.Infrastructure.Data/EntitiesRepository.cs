using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;

namespace SamanCRM.Infrastructure.Data
{
    public class EntitiesRepository : GenericRepository<Entities>, IEntitiesRepository
    {
        public EntitiesRepository(DemoContext Context) : base(Context)
        {
        }
    }
}
