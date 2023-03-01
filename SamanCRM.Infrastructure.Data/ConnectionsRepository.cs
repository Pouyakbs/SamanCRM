using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;

namespace SamanCRM.Infrastructure.Data
{
    public class ConnectionsRepository : GenericRepository<Connections>, IConnectionsRepository
    {
        public ConnectionsRepository(DemoContext Context) : base(Context)
        {
        }
    }
}
