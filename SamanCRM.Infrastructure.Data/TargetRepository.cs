using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;

namespace SamanCRM.Infrastructure.Data
{
    public class TargetRepository : GenericRepository<Target>, ITargetRepository
    {
        public TargetRepository(DemoContext Context) : base(Context)
        {
        }
    }
}
