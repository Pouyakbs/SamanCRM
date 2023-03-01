using SamanCRM.Core.Contracts.Repository.Common;
using SamanCRM.Core.Domain.Entities;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Repository
{
    public interface IArchiveRepository : IGenericRepository<Archive>
    {
        List<Archive> GetArchiveByRecordID(int id);
    }

}
