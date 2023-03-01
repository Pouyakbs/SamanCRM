using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;

namespace SamanCRM.Infrastructure.Data
{
    public class OpportunitiesRepository : GenericRepository<Opportunities>, IOpportunitiesRepository
    {
        public OpportunitiesRepository(DemoContext Context) : base(Context)
        {
        }
    }
}
