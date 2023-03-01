using SamanCRM.Core.Contracts.Repository.Common;
using SamanCRM.Core.Domain.Entities;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Repository
{
    public interface IProgramPartRepository : IGenericRepository<ProgramPart>
    {
        List<ProgramPart> GetByRoleID(int id);
        List<ProgramPart> GetAllPrograms();
    }

}
