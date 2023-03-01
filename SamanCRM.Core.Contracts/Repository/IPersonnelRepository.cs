using SamanCRM.Core.Contracts.Repository.Common;
using SamanCRM.Core.Domain.Entities;
using System.Linq;

namespace SamanCRM.Core.Contracts.Repository
{
    public interface IPersonnelRepository : IGenericRepository<Personnel>
    {
        bool RoleExistance(int id);
        Personnel GetPersonnelByID(int id);
    }
}
