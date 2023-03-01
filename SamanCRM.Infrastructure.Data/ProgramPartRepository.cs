using Microsoft.EntityFrameworkCore;
using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;
using System.Collections.Generic;
using System.Linq;

namespace SamanCRM.Infrastructure.Data
{
    public class ProgramPartRepository : GenericRepository<ProgramPart>, IProgramPartRepository
    {
        private readonly DemoContext context;

        public ProgramPartRepository(DemoContext Context) : base(Context)
        {
            context = Context;
        }
        public List<ProgramPart> GetByRoleID(int id)
        {
            var result = context.ProgramPart.Where(a => a.RoleID == id).Include(a => a.RoleProgramParts).ToList();
            return result;
        }
        public List<ProgramPart> GetAllPrograms()
        {
            var result = context.ProgramPart.Include(a => a.RoleProgramParts).ToList();
            return result;
        }
    }
}
