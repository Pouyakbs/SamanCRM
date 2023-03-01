using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;
using System.Collections.Generic;
using System.Linq;

namespace SamanCRM.Infrastructure.Data
{
    public class ComPublicRepository : GenericRepository<ComPublic>, IComPublicRepository
    {
        private readonly DemoContext context;

        public ComPublicRepository(DemoContext Context) : base(Context)
        {
            context = Context;
        }
        public List<ComPublic> GetComPublicByProgramPartID(int id)
        {
            var result = context.ComPublics.Where(a => a.ProgramPartID == id).ToList();
            return result;
        }
    }
}
