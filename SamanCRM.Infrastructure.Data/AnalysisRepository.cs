using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;

namespace SamanCRM.Infrastructure.Data
{
    public class AnalysisRepository : GenericRepository<Analysis>, IAnalysisRepository
    {
        public AnalysisRepository(DemoContext Context) : base(Context)
        {
        }
    }
}
