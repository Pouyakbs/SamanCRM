using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;

namespace SamanCRM.Infrastructure.Data
{
    public class AccountRepository : GenericRepository<Account>, IAccountRepository
    {
        public AccountRepository(DemoContext Context) : base(Context)
        {
        }
    }
}
