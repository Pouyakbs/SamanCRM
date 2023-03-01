using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Infrastructure.Data
{
    public class CompanyRepository : GenericRepository<Company>, ICompanyRepository
    {
        public CompanyRepository(DemoContext Context) : base(Context)
        {
        }
    }
}
