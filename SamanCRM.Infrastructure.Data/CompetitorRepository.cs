using Microsoft.EntityFrameworkCore;
using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;
using System.Linq;

namespace SamanCRM.Infrastructure.Data
{
    public class CompetitorRepository : GenericRepository<Competitor>, ICompetitorRepository
    {

        public CompetitorRepository(DemoContext Context) : base(Context)
        {
        }
    }
}
