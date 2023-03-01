using SamanCRM.Core.Contracts.Repository.Common;
using SamanCRM.Core.Domain.Entities;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Repository
{
    public interface IComPublicRepository : IGenericRepository<ComPublic>
    {
        List<ComPublic> GetComPublicByProgramPartID(int id);
    }
}
