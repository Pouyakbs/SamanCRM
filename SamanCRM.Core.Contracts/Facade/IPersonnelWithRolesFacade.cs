using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IPersonnelWithRolesFacade
    {
        IEnumerable<PersonnelsWithRolesDTO> GetAllPersonnelsWithRoles();
    }
}
