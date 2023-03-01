using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;
using System.Collections.Generic;
using System.Linq;

namespace SamanCRM.Infrastructure.Data
{
    public class ArchiveRepository : GenericRepository<Archive>, IArchiveRepository
    {
        private readonly DemoContext context;

        public ArchiveRepository(DemoContext Context) : base(Context)
        {
            context = Context;
        }
        public List<Archive> GetArchiveByRecordID(int id)
        {
            return context.Archives.Where(a => a.RecordID == id).ToList();
        }
    }
}
