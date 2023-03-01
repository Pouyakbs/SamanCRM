using Microsoft.Data.SqlClient;
using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;
using System.Collections.Generic;

namespace SamanCRM.Infrastructure.Data
{
    public class RoleRepository : GenericRepository<ApplicationRole>, IApplicationRoleRepository
    {
        private DemoContext Context;

        public RoleRepository(DemoContext Context) : base(Context)
        {
            this.Context = Context;
        }
    }
}
