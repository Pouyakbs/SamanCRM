using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;

namespace SamanCRM.Infrastructure.Data
{
    public class ComPublicTitlesRepository : GenericRepository<ComPublicTitles>, IComPublicTitlesRepository
    {
        public ComPublicTitlesRepository(DemoContext Context) : base(Context)
        {
        }
    }
}
