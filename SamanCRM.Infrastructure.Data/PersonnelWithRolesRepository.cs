using Microsoft.Data.SqlClient;
using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Core.Domain.Models;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;
using System.Collections.Generic;
using System.Linq;

namespace SamanCRM.Infrastructure.Data
{
    public class PersonnelWithRolesRepository : GenericRepository<PersonnelWithRoles>, IPersonnelWithRolesRepository
    {
        private readonly DemoContext context;

        public PersonnelWithRolesRepository(DemoContext Context) : base(Context)
        {
            context = Context;
        }
        public List<PersonnelWithRoles> GetAllPersonnelsWithRoles()
        {

            return context.PersonnelWithRoles.ToList();
        }
    }
}
