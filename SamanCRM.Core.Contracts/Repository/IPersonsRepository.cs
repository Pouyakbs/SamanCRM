using SamanCRM.Core.Contracts.Repository.Common;
using SamanCRM.Core.Domain.Entities;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Repository
{
    public interface IPersonsRepository : IGenericRepository<Persons>
    {
        IEnumerable<Persons> GetPersonsByAccountID(int id);
    }
}
