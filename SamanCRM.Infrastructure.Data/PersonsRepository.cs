using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;
using System.Collections.Generic;
using System.Linq;

namespace SamanCRM.Infrastructure.Data
{
    public class PersonsRepository : GenericRepository<Persons>, IPersonsRepository
    {
        private readonly DemoContext context;

        public PersonsRepository(DemoContext Context) : base(Context)
        {
            context = Context;
        }
        public IEnumerable<Persons> GetPersonsByAccountID(int id)
        {
            return context.Persons.Where(a => a.AccountID == id).ToList();
        }
    }
}
