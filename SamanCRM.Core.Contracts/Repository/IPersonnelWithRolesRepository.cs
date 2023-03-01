using SamanCRM.Core.Contracts.Repository.Common;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Core.Domain.Models;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Repository
{
    public interface IPersonnelWithRolesRepository
    {
        List<PersonnelWithRoles> GetAllPersonnelsWithRoles();
    }
}
