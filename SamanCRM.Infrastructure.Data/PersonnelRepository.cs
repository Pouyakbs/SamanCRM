using Microsoft.EntityFrameworkCore;
using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;
using System.Linq;

namespace SamanCRM.Infrastructure.Data
{
    public class PersonnelRepository : GenericRepository<Personnel>, IPersonnelRepository
    {
        private readonly DemoContext context;

        public PersonnelRepository(DemoContext Context) : base(Context)
        {
            context = Context;
        }
        public Personnel GetPersonnelByID(int id)
        {
            var personnels = context.Personnels.Include(a => a.PersonnelRole).ToList();
            Personnel personnel = personnels.Find(a=>a.PersonnelID==id);
            return personnel;
        }

        public bool RoleExistance(int id)
        {
            var personnelRole = context.Personnels.Where(a => a.orgPost == id).ToList();
            if (personnelRole.Count == 0)
            {
                return false;
            }
            return true;
        }
    }
}
