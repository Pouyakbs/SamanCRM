using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IApplicationRoleFacade
    {
        ApplicationRoleDTO GetById(int id);
        IEnumerable<ApplicationRoleDTO> GetAll();
        int Add(ApplicationRoleDTO entity);
        void Remove(ApplicationRoleDTO entity);
        void Update(ApplicationRoleDTO entity);
    }
}
